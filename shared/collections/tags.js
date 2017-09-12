Tags = new Mongo.Collection( 'tags' );

let tagsSchema = new SimpleSchema({
  createdOn: {
    type: Date,
    label: "Created On"
  },
  tagValue: {
    type: String
  },
  tweetIds: {
      type: [String]
  }
});

Tags.attachSchema(tagsSchema);

Tags.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Tags.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});