Meteor.publish( 'tweets', () => {
    return Tweets.find();
  });

Meteor.publish('tags', () => {
  return Tags.find();
});

Meteor.publish('users', () => {
  return Meteor.users.find();
});