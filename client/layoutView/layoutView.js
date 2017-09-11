Template.newNotifications.onCreated( () => {
    Template.instance().subscribe( 'notifications' );  
});

Template.newNotifications.helpers({
    newNotifications: function() {
        let notifications = Notifications.find({sentTo: Meteor.userId(), hasBeenRead: false}).fetch();
        return notifications && notifications.length;
    }
})