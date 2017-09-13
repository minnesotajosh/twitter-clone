Meteor.methods({
    'notifications.markAsRead': function() {
        console.log('marking as read');
        Notifications.update({sentTo: Meteor.userId()}, {$set: {hasBeenRead: true}}, {multi: true});
    },
    'notifications.followedUser': function(userId) {
        let notification = {
            createdOn: Date.now(),
            content: '',
            sentBy: Meteor.userId(),
            sentTo: userId,
            type: 'follow'
        }

        return insertedNotification = Notifications.insert(notification);

    },
    'notifications.likedTweet': function(tweetId, userId) {
        let tweet = Tweets.findOne(tweetId);

        let notification = {
            createdOn: Date.now(),
            content: tweetId,
            sentTo: tweet.createdBy,
            sentBy: userId,
            type: 'like'
        };

        return insertedNotification = Notifications.insert(notification);
    },
    'notifications.retweetedTweet': function(tweetId, userId) {
        let tweet = Tweets.findOne(tweetId);

        let notification = {
            createdOn: Date.now(),
            content: tweetId,
            sentTo: tweet.createdBy,
            sentBy: userId,
            type: 'retweet'
        };

        let insertedNotification = Notifications.insert(notification);
        return insertedNotification;
    },
    'notifications.unlikedTweet': function(tweet, liker) {

    }
  });