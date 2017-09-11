Meteor.publish( 'tweets', () => {
    return Tweets.find();

    return this.ready();
  });

Meteor.publish('tags', () => {
  return Tags.find();

  return this.ready();
});

Meteor.publish('users', () => {
  return Meteor.users.find();

  return this.ready();
});

Meteor.publish('notifications', () => {
  return Notifications.find();

  return this.ready();
});