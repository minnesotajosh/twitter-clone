Template.userProfileContainer.onCreated( () => {
    Template.instance().subscribe( 'users' );
  });

Template.userProfileContainer.helpers({
    user: function() {
        return this.username;
    },
    tweetCount: function() {
        return Meteor.user().profile.tweetCount;
    },
    followedByCount: function() {
        return Meteor.user().profile.followedBy.length;
    },
    followingCount: function() {
        return Meteor.user().profile.following.length;
    }    
});