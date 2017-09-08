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
    },
    likes: function() {
        return this.likes.length;
    },
    isLiked: function() {
        return 'is-liked';
    }
});

Template.tweetContainer.events({
    'click [data="delete-tweet"]': function(event) {
        Meteor.call('tweets.deleteTweet', this._id);
    },
    'click [data="like-tweet"]': function(event) {
        Meteor.call('tweets.likeTweet', this._id);
    }  
});