Meteor.methods({
  'tweets.insertTweet': function (tweet, isRetweet = false) {
    let tags = [];
    let mentions = [];

    tweet.createdBy = Meteor.userId();
    tweet.createdOn = new Date();
    if (!isRetweet) {
      tweet.tweetData = sanitizeHtml(tweet.tweetData, { allowedTags: ['a'] });
      let findTags = tweet.tweetData.split(' ');
      for (let word of findTags) {
        if (word.slice(0, 1) === '#') {
          tags.push(word.substring(1));
        } else if (word.slice(0, 1) === '@') {
          mentions.push(Meteor.users.findOne(
            {'username': word.substring(1)}
          )._id);
        }
      }

      tweet.tags = _.uniq(tags);
      tweet.mentions = _.uniq(mentions);
      tweet.tweetData = tweet.tweetData.replace(/#([a-zA-Z0-9]+)/g, '<a href="/search/?tags=$1">#$1</a>');
      tweet.tweetData = tweet.tweetData.replace(/@([a-zA-Z0-9]+)/g, '<a href="/users/$1">@$1</a>');

    }

    /*
        * Check if currentUser is inserting tweets to their own account
        * Parse message for @handles, #tags
        * createdOn, other fields?
    */
    let insertedTweet = Tweets.insert(tweet);
    Meteor.call('insertTags', insertedTweet);
    Meteor.users.update(
      { _id: Meteor.userId() },
      { $inc: { 'profile.tweetCount': 1 } }
    );



    return insertedTweet;
  },

  'tweets.deleteTweet': function (tweetId) {
    let tweet = Tweets.findOne({ _id: tweetId });
    if (tweet.createdBy === Meteor.userId() || tweet.retweetedBy === Meteor.userId()) {
      //todo: remove count from tags too
      // for (let tag of tweet.tags) {
      //   Meteor.call('removeTweetIdFromTag', tag, tweetId);
      // }

      Tweets.remove(tweetId);
      Meteor.users.update(
        { _id: Meteor.userId() },
        { $inc: { 'profile.tweetCount': -1 } }
      );
    }
  },

  'tweets.likeTweet': function (tweetId) {
    /*

    schema of a tweet will need an array of userIds that liked it
    a user's schema will need an array of tweets the user liked

    check if user already likes tweet
    */

    let tweet = Tweets.findOne({ _id: tweetId });
    let user = Meteor.users.findOne(Meteor.userId());


    if (tweet.likes.indexOf(Meteor.userId()) > -1) {
      //user is unliking this
      tweet.likes = _.without(tweet.likes, Meteor.userId());
      user.profile.likes = _.without(user.profile.likes, tweetId);
      Meteor.call('notifications.unlikedTweet', tweetId, Meteor.userId());
    } else {
      //user is liking this
      tweet.likes.push(Meteor.userId());
      user.profile.likes.push(tweetId);
      Meteor.call('notifications.likedTweet', tweetId, Meteor.userId());
    }

    Tweets.update(
      { _id: tweetId },
      { $set: { likes: tweet.likes } }
    );
    Meteor.users.update(
      { _id: Meteor.userId() },
      { $set: { 'profile.likes': user.profile.likes } }
    );

  },

  'tweets.retweetTweet': function (tweetId) {

    let originalTweet = Tweets.findOne(tweetId);
    let newTweet = originalTweet;
    delete newTweet._id;
    newTweet.retweetedBy = Meteor.userId();
    newTweet.createdOn = Date.now();
    newTweet.originalTweetId = tweetId;

    let insertedTweet = Tweets.insert(newTweet);

    originalTweet.retweets.push(insertedTweet);

    Tweets.update( { _id: tweetId }, {
      $set: { 'retweets': originalTweet.retweets }
    });

    Meteor.users.update(
      { _id: Meteor.userId() },
      { $inc: { 'profile.tweetCount': 1 } }
    );

    Meteor.call('notifications.retweetedTweet', tweetId, Meteor.userId());

  }

});