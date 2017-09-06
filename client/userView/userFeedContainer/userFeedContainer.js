Template.userFeedContainer.onCreated( () => {
    Template.instance().subscribe( 'tweets' );  
  });

Template.userFeedContainer.helpers({
    tweets: () => {
        return Tweets.find({}, {sort: {createdOn: -1}});
    }
});