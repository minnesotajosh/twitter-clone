Template.tweetContainer.onCreated( () => {
    Template.instance().subscribe( 'users' );  
  });

Template.tweetContainer.helpers({
    canDelete: function() {
        return Meteor.userId() === this.createdBy;
    },
    authorName: function() {
        return Meteor.users.findOne(this.createdBy).username;
    }
});

Template.tweetContainer.events({
    'click a[data="delete-tweet"]': function(event) {
        Meteor.call('deleteTweet', this._id);
    }    
});