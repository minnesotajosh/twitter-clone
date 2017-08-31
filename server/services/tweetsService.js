Meteor.methods({
    insertTweet( tweet ) {

      tweet.createdBy = this.userId;
      tweet.createdOn = new Date();

      console.log(tweet);

        /*
            * Check if currentUser is inserting tweets to their own account
            * Parse message for @handles, #tags
            * createdOn, other fields?
        */
      Tweets.insert(tweet);
    }
  });