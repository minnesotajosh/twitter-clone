Tags = new Mongo.Collection( 'tags' );

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