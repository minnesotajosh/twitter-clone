Template.userViewHeaderContainer.onCreated( () => {
    Template.instance().subscribe( 'users' );  
  });

Template.userViewHeaderContainer.helpers({
    username: function() {
        return this.username;
    },
    ownsProfile: function() {
        return Meteor.userId() === this._id;
    },
    followingUser: function() {
        return Meteor.user() && (Meteor.user().profile.following.indexOf(this._id) > -1 );
    },
    followedByCount: function() {
        let foundUser = Meteor.users.findOne(this._id);
        console.log(this);
        return foundUser && foundUser.profile.followedBy.length || 0;
    },
    followingCount: function() {
        let foundUser = Meteor.users.findOne(this._id);
        console.log(this);
        return foundUser && foundUser.profile.following.length || 0;
    }
});

Template.userViewHeaderContainer.events({
    'click button[data="follow-user"]': function(event) {
        Meteor.call('followUser', this._id);
    },    
    'click button[data="unfollow-user"]': function(event) {
        Meteor.call('unfollowUser', this._id);
    }    
});