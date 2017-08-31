Template.ApplicationLayout.onCreated( () => {
    Template.instance().subscribe( 'tweets' );  
  });

Template.ApplicationLayout.helpers({
    isLoggedOut: () => {
        if (!Meteor.userId()) {            
            return "isLoggedOut";
        }
    },
    tweets: () => {
        return Tweets.find({}, {sort: {createdOn: -1}});
    },
    canDelete: function() {
        return Meteor.userId() === this.createdBy;
    }
});

Template.ApplicationLayout.events({
    'click a[data="delete-tweet"]': function(event) {
        Meteor.call('deleteTweet', this._id);
    }
})