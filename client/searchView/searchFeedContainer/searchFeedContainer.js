Template.searchFeedContainer.onCreated( () => {
    Template.instance().subscribe( 'tweets' );  
});

Template.searchFeedContainer.helpers({
    foundTweets: function() {

        let tagList = this.queryParams.tags.split(',') || [];
        let tweets = [];
        let foundTweets = []

        tagList.map(tag => {
            foundTweets = Tweets.find({ tags: tag }, {sort: {createdOn: -1}}).fetch();
            foundTweets.map(tweet => {
                tweets.push(tweet);
            });
        });
        return _.sortBy(_.uniq(tweets, false, function(t) {return t._id}), 'createdOn').reverse();
    }
});