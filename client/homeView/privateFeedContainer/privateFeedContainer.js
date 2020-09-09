Template.privateFeedContainer.onCreated( () => {
    Template.instance().subscribe( 'tweets' );
    Template.instance().subscribe( 'users' );
  });

Template.privateFeedContainer.helpers({
    tweets: () => {
        return Tweets.find({}, {sort: {createdOn: -1}});
    }
});