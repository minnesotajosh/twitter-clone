Template.notificationsView.onCreated( () => {
    Template.instance().subscribe( 'notifications' );  
    Template.instance().subscribe( 'tweets' );  
    Template.instance().subscribe( 'users' );  
  });

Template.notificationsView.helpers({
    notifications: function() {
        return Notifications.find({sentTo: this._id}, {sort: {createdOn: -1}});
    },
    notificationType: function() {
        switch (this.type) {
            case 'like': return Template.notificationLike;
            default: return '';
        }
    }
});