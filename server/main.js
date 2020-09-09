Meteor.startup(() => {
    if (!Meteor.users.find().fetch().length) {
        let user1 = Accounts.createUser({
            username: 'user1',
            emails: [
                {address: 'user1@gmail.com', verified: false}
            ],
            password: 'password',
            profile: {
              name: 'user1',
              createdOn: new Date(),
              tweetCount: 2
            },
            createdAt: Date.now()
        });
        let user2 = Accounts.createUser({
            username: 'user2',
            emails: [
                {address: 'user2@gmail.com', verified: false}
            ],
            password: 'password',
            profile: {
              name: 'user2',
              createdOn: new Date(),
              tweetCount: 2
            },
            createdAt: Date.now()
        });
        let user3 = Accounts.createUser({
            username: 'user3',
            emails: [
                {address: 'user3@gmail.com', verified: false}
            ],
            password: 'password',
            profile: {
              name: 'user3',
              createdOn: new Date(),
              tweetCount: 1
            },
            createdAt: Date.now()
        });
        let user4 = Accounts.createUser({
            username: 'user4',
            emails: [
                {address: 'user4@gmail.com', verified: false}
            ],
            password: 'password',
            profile: {
              name: 'user4',
              createdOn: new Date()
            },
            createdAt: Date.now()
        });
        
        let tweet1 = Tweets.insert({
            tweetData: '<a href="/search/?tags=test123">#test123</a> <a href="/search/?tags=test456">#test456</a>',
            createdBy: user1,
            createdOn: Date.now(),
            tags: [ 'test123', 'test456' ]
        });
        Meteor.call('insertTags', tweet1);
        let tweet2 = Tweets.insert({
            tweetData: '<a href="/search/?tags=wow">#wow</a> so cool',
            createdBy: user1,
            createdOn: Date.now(),
            tags: [ 'wow' ]
        });
        Meteor.call('insertTags', tweet2);

        let tweet3 = Tweets.insert({
            tweetData: '<a href="/search/?tags=test123">#test123</a> This is fun!',
            createdBy: user2,
            createdOn: Date.now(),
            tags: [ 'test123' ]
        });
        Meteor.call('insertTags', tweet3);
        let tweet4 = Tweets.insert({
            tweetData: '<a href="/search/?tags=yolo">#yolo</a>',
            createdBy: user2,
            createdOn: Date.now(),
            tags: [ 'yolo' ]
        });
        Meteor.call('insertTags', tweet4);        

        let tweet5 = Tweets.insert({
            tweetData: '<a href="/search/?tags=tgif">#tgif</a> you guys!',
            createdBy: user3,
            createdOn: Date.now(),
            tags: [ 'tgif' ]
        });
        Meteor.call('insertTags', tweet5);

    }
});