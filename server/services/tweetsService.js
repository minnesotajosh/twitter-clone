Meteor.methods({
    insertTweet( tweet ) {

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

      tweet.tags = tags.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
      tweet.tweetData = tweet.tweetData.replace(/#([a-zA-Z0-9]+)/g,'<a href="/search/$1">#$1</a>');
      console.log(tweet);
      

        /*
            * Check if currentUser is inserting tweets to their own account
            * Parse message for @handles, #tags
            * createdOn, other fields?
        */
      let insertedTweet = Tweets.insert(tweet);
      Meteor.call('insertTags', insertedTweet);
    },

    deleteTweet(tweetId) {
      let tweet = Tweets.findOne({ _id: tweetId});
      if (tweet.createdBy === this.userId) {
        Tweets.remove(tweetId);
      }
    }

  });