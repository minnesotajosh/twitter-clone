Template.ApplicationLayout.onCreated( () => {
    Template.instance().subscribe( 'tweets' );  
  });

Template.ApplicationLayout.helpers({
    isLoggedOut: () => {
        if (!Meteor.userId()) {            
            return "isLoggedOut";
        }
    },
    tweets: () => {
        return Tweets.find({}, {sort: {createdOn: -1}});
    }
});