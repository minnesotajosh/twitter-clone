Template.userFeedContainer.onCreated( () => {
    Template.instance().subscribe( 'tweets' );
    Template.instance().subscribe( 'users' );
  });

Template.userFeedContainer.helpers({
    tweets: function() {
        return Tweets.find({createdBy: this._id}, {sort: {createdOn: -1}});
    }
});