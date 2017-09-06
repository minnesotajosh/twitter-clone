Template.privateFeedContainer.onCreated( () => {
    Template.instance().subscribe( 'tweets' );  
  });

Template.privateFeedContainer.helpers({
    tweets: () => {
        return Tweets.find({}, {sort: {createdOn: -1}});
    }
});