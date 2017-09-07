Meteor.methods({
    insertTags( tweetId ) {
        let tweet = Tweets.findOne(tweetId);
    let newTag = {};
    for (let tag of tweet.tags) {
        let foundTag = Tags.findOne({tagValue: tag.toLowerCase()});
        if(foundTag) {
            foundTag.tweetIds.push(tweet._id);

            Tags.update(
                { _id: foundTag._id },
                { $set: { "tweetIds": foundTag.tweetIds } }
             )

            //found the tag, so add this tweet to tagAppearsInTweets or whatever (for search)
            //keep track of count in last 24 hours to see if trending?
        } else {
            newTag.tagValue = tag.toLowerCase();
            newTag.createdOn = new Date();
            newTag.tweetIds = [];
            newTag.tweetIds.push(tweet._id);

            Tags.insert(newTag);
            //should really adopt schema
        }
    }

    console.log(Tags.find().fetch());







    //   tweet.createdBy = this.userId;
    //   tweet.createdOn = new Date();
    //   tweet.tweetData = sanitizeHtml(tweet.tweetData);
    //   tweet.tweetData = tweet.tweetData.replace(/#([a-zA-Z0-9]+)/g,'<a href="/search/$1">#$1</a>');
    //   console.log(tweet);

    //     /*
    //         * Check if currentUser is inserting tweets to their own account
    //         * Parse message for @handles, #tags
    //         * createdOn, other fields?
    //     */
    //   Tweets.insert(tweet);
    }

  });