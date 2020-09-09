Template.singleTweetView.onCreated( function() {
    Template.instance().subscribe( 'users' );
    Template.instance().subscribe( 'tweets' );
  });

Template.singleTweetView.helpers({
    tweetAuthor: function() {
        let author = Meteor.users.findOne(this.createdBy);
        return Meteor.users && author;
    },
    singleTweet: function() {
        let tweet = Tweets.findOne(this._id);
        return Tweets && tweet;
    }
});