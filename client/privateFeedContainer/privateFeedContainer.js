Template.privateFeedContainer.onCreated( () => {
    Template.instance().subscribe( 'tweets' );  
  });

Template.privateFeedContainer.helpers({
    tweets: () => {
        return Tweets.find({}, {sort: {createdOn: -1}});
    },
    canDelete: function() {
        return Meteor.userId() === this.createdBy;
    }
});

Template.privateFeedContainer.events({
    'click a[data="delete-tweet"]': function(event) {
        Meteor.call('deleteTweet', this._id);
    }
})