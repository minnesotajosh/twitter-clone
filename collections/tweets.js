Tweets = new Mongo.Collection( 'tweets' );

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