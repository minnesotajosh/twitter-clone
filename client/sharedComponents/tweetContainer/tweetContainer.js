Template.tweetContainer.onCreated( () => {
    Template.instance().subscribe( 'users' );  
  });

Template.tweetContainer.helpers({
    canDelete: function() {
        return Meteor.userId() === this.createdBy;
    },
    username: function() {
        let foundUser = Meteor.users.findOne(this.createdBy);
        return foundUser && foundUser.username;
    }
});

Template.tweetContainer.events({
    'click a[data="delete-tweet"]': function(event) {
        Meteor.call('deleteTweet', this._id);
    }    
});