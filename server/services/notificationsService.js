Meteor.methods({
    'notifications.markAsRead': function() {
        console.log('marking as read');
        Notifications.update({sentTo: Meteor.userId()}, {$set: {hasBeenRead: true}}, {multi: true});
    },
    'notifications.likedTweet': function(tweetId, likerId) {
        let tweet = Tweets.findOne(tweetId);

        let notification = {
            createdOn: Date.now(),
            content: tweetId,
            sentTo: tweet.createdBy,
            sentBy: likerId,
            type: 'like',
            hasBeenRead: false
        };

        let insertedNotification = Notifications.insert(notification);
    },
    'notifications.unlikedTweet': function(tweet, liker) {

    }    
  });