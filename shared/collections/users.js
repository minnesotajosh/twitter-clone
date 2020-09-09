let userProfileSchema = new SimpleSchema({
    name: {
        type: String,
        optional: true,
        max: 254
    },
    birthday: {
        type: Date,
        optional: true
    },
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true,
        max: 2000
    },
    bio: {
        type: String,
        optional: true,
        max: 254
    },
    location: {
        type: String,
        optional: true,
        max: 254
    },
    following: {
        type: [String],
        defaultValue: []
    },
    followedBy: {
        type: [String],
        defaultValue: []
    },
    tweetCount: {
        type: Number,
        defaultValue: 0
    },
    likes: {
        type: [String],
        optional: true,
        defaultValue: []
    }
});

userSchema = new SimpleSchema({
    username: { //twitter handle
        type: String
    },
    emails: {
        type: Array,
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: userProfileSchema,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true
    }
});

Meteor.users.attachSchema(userSchema);

//prevents client from modifying
Meteor.users.allow({
    insert() { return false; },
    update() { return false; },
    remove() { return false; }
  });

Meteor.users.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
  });
