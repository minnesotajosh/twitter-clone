Meteor.methods({
    'users.followUser': function(userId) {

        let followingList = Meteor.user().profile.following;
        followingList.push(userId);
        Meteor.users.update(
            { _id: Meteor.userId() },
            { $set: { 'profile.following': _.uniq(followingList)}}
        );

        let followedByList = Meteor.users.findOne(userId).profile.followedBy;
        followedByList.push(Meteor.userId());
        Meteor.users.update(
            { _id: userId },
            { $set: { 'profile.followedBy': _.uniq(followedByList)}}
        );

        Meteor.call('notifications.followedUser', userId);
    },
    'users.unfollowUser': function(userId) {
        let followingList = Meteor.user().profile.following;
        Meteor.users.update(
            { _id: Meteor.userId() },
            { $set: { 'profile.following': _.reject(followingList, function(user) { return user === userId })}}
        );
        let followedByList = Meteor.users.findOne(userId).profile.followedBy;
        Meteor.users.update(
            { _id: userId },
            { $set: { 'profile.followedBy': _.reject(followedByList, function(user) { return user === Meteor.userId() })}}
        );
    },
    'users.updateUser': function(userProfile) {

        let originalProfile = Meteor.user().profile;

        for (var property in userProfile) {
            if (userProfile.hasOwnProperty(property)) {
                originalProfile[property] = userProfile[property];
            }
        }

        Meteor.users.update(
            { _id: Meteor.userId() },
            { $set: { 'profile': originalProfile }}
        );
    }


  });