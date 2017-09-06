Meteor.methods({
    followUser: function(userId) {

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
    },
    unfollowUser: function(userId) {
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
    }


  });