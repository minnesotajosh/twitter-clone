Tweets = new Mongo.Collection( 'tweets' );

let tweetSchema = new SimpleSchema({
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
  },
  likes: {
    type: [String],
    defaultValue: []
  },
  retweetedBy: {
    type: String,
    optional: true
  },
  retweets: {
    type: [String],
    defaultValue: []
  },
  originalTweetId: {
    type: String,
    optional: true
  },
  mentions: {
    type: [String],
    defaultValue: []
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