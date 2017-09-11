Template.tweetContainer.onCreated( () => {
    Template.instance().subscribe( 'users' );  
    Template.instance().subscribe( 'tweets' );  
  });

Template.tweetContainer.helpers({
    canDelete: function() {
        return Meteor.userId() === this.createdBy || Meteor.userId() === this.retweetedBy;
    },
    username: function() {
        let foundUser = Meteor.users.findOne(this.createdBy);
        return foundUser && foundUser.username;
    },
    likesCount: function() {
        return this.likes.length;
    },
    isLiked: function() {
        return 'is-liked';
    },
    retweetsCount: function() {
        return this.retweets.length;
    },
    retweetedBy: function() {
        return Meteor.users.findOne(this.retweetedBy) && Meteor.users.findOne(this.retweetedBy).username;
    },
    originalRetweetsCount: function() {
        return Tweets.findOne(this.originalTweetId) && Tweets.findOne(this.originalTweetId).retweets.length;        
    },
    originalLikesCount: function() {
        return Tweets.findOne(this.originalTweetId) && Tweets.findOne(this.originalTweetId).likes.length;        
    },
});

Template.tweetContainer.events({
    'click [data="delete-tweet"]': function(event) {
        Meteor.call('tweets.deleteTweet', this._id);
    },
    'click [data="like-tweet"]': function(event) {
        Meteor.call('tweets.likeTweet', this._id);
    },
    'click [data="retweet-tweet"]': function(event) {
        Meteor.call('tweets.retweetTweet', this._id);
    },
    'click [data="like-retweet"]': function(event) {
        Meteor.call('tweets.likeTweet', this.originalTweetId);
    },
    'click [data="retweet-retweet"]': function(event) {
        Meteor.call('tweets.retweetTweet', this.originalTweetId);
    }
});