Template.notificationsView.onCreated( () => {
    Template.instance().subscribe( 'notifications' );  
    Template.instance().subscribe( 'tweets' );  
    Template.instance().subscribe( 'users' );  

    Template.notificationsView.markAsRead = setTimeout(function() {Meteor.call('notifications.markAsRead')}, 3000);
  });

Template.notificationsView.helpers({
    notifications: function() {
        let notifications = Notifications.find({sentTo: this._id}, {sort: {createdOn: -1}}).fetch();
        return notifications;
    },
    notificationType: function() {
        switch (this.type) {
            case 'like': return Template.notificationLike;
            default: return '';
        }
    },
    unread: function() {
        return this.hasBeenRead ? '' : 'unread';
    }
});

Template.notificationLike.helpers({
    tweetSummary: function() {
        //console.log(this);
        let tweet = Tweets.findOne(this.content);
        return tweet && tweet.tweetData;
    },
    authorUsername: function() {
        let tweet = Tweets.findOne(this.content);
        let user = tweet && Meteor.users.findOne(tweet.createdBy);
        return tweet && user && user.username;
    },
    likedBy: function() {
        let user = Meteor.users.findOne(this.sentBy);        
        return user && user.username;
    }
});

Template.notificationsView.onDestroyed(function () {
    clearTimeout(Template.notificationsView.markAsRead);
});