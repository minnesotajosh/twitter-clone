Template.newNotifications.onCreated( () => {
    Template.instance().subscribe( 'notifications' );
});

Template.newNotifications.helpers({
    newNotifications: function() {
        let notifications = Notifications.find({sentTo: Meteor.userId(), hasBeenRead: false}).fetch();
        return notifications && notifications.length;
    }
});

Template.layout.helpers({
    username: function() {
        return Meteor.user() && Meteor.user().username;
    }
});