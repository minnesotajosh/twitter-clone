Meteor.methods({
    insertTweet( tweet ) {

      tweet.createdBy = this.userId;
      tweet.createdOn = new Date();
      tweet.tweetData = sanitizeHtml(tweet.tweetData);
      tweet.tweetData = tweet.tweetData.replace(/#([a-zA-Z0-9]+)/g,'<a href="/search/$1">#$1</a>');
      console.log(tweet);

        /*
            * Check if currentUser is inserting tweets to their own account
            * Parse message for @handles, #tags
            * createdOn, other fields?
        */
      Tweets.insert(tweet);
    },

    deleteTweet(tweetId) {
      let tweet = Tweets.findOne({ _id: tweetId});
      if (tweet.createdBy === this.userId) {
        Tweets.remove(tweetId);
      }
    }

  });