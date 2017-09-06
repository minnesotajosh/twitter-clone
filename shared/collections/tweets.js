Tweets = new Mongo.Collection( 'tweets' );

tweetSchema = new SimpleSchema({
  createdBy: {
    type: String,
    label: "Created By"
  },
  createdOn: {
    type: Date,
    label: "Created On"
  },
  tweetData: {
    type: String,
    label: "Tweet content",
    max: 140
  },
  tags: {
    type: [String],
    optional: true
  }
});

Tweets.attachSchema(tweetSchema);

//prevents client from modifying
Tweets.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Tweets.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});