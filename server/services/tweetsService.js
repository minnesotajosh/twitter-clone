Meteor.methods({
  'tweets.insertTweet': function (tweet) {
    let tags = [];

    tweet.createdBy = Meteor.userId();
    tweet.createdOn = new Date();
    tweet.tweetData = sanitizeHtml(tweet.tweetData);

    let findTags = tweet.tweetData.split(' ');
    for (let word of findTags) {
      if (word.slice(0, 1) === '#') {
        tags.push(word.substring(1));
      }
    }

    tweet.tags = _.uniq(tags);
    tweet.tweetData = tweet.tweetData.replace(/#([a-zA-Z0-9]+)/g, '<a href="/search/?tags=$1">#$1</a>');
    console.log(tweet);


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
  },

  'tweets.deleteTweet': function (tweetId) {
    let tweet = Tweets.findOne({ _id: tweetId });
    if (tweet.createdBy === Meteor.userId()) {
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
    } else {
      //user is liking this
      tweet.likes.push(Meteor.userId());
      user.profile.likes.push(tweetId);
    }

    Tweets.update(
      { _id: tweetId },
      { $set: { likes: tweet.likes } }
    );
    Meteor.users.update(
      { _id: Meteor.userId() },
      { $set: { 'profile.likes': user.profile.likes } }
    );

  }

});