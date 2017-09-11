Notifications = new Mongo.Collection( 'notifications' );

let notificationSchema = new SimpleSchema({
  createdOn: {
    type: Date,
    label: "Created On"
  },
  content: {
    type: String,
    label: "Notification content",
    defaultValue: ''
  },
  sentTo: {
      type: String
  },
  sentBy: {
      type: String
  },
  hasBeenRead: {
      type: Boolean,
      defaultValue: false
  },
  type: {
    type: String,
    defaultValue: ''
  }
});

Notifications.attachSchema(notificationSchema);

//prevents client from modifying
Notifications.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Notifications.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});