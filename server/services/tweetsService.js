Meteor.methods({
    insertTweet: function(tweet) {
      let tags = [];

      tweet.createdBy = this.userId;
      tweet.createdOn = new Date();
      tweet.tweetData = sanitizeHtml(tweet.tweetData);

      let findTags = tweet.tweetData.split(' ');
      for(let word of findTags) {
        if (word.slice(0,1) === '#') {
          tags.push(word.substring(1));
        }
      }

      tweet.tags = _.uniq(tags);
      tweet.tweetData = tweet.tweetData.replace(/#([a-zA-Z0-9]+)/g,'<a href="/search/?tags=$1">#$1</a>');
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
        { $inc: { 'profile.tweetCount': 1} }
      );
    },

    deleteTweet: function(tweetId) {
      let tweet = Tweets.findOne({ _id: tweetId});
      if (tweet.createdBy === this.userId) {
        //todo: remove count from tags too
        // for (let tag of tweet.tags) {
        //   Meteor.call('removeTweetIdFromTag', tag, tweetId);
        // }

        Tweets.remove(tweetId);
        Meteor.users.update(
          { _id: Meteor.userId() },
          { $inc: { 'profile.tweetCount': -1} }
        );
      }
    }

  });