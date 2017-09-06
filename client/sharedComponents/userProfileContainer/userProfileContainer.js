Template.userProfileContainer.onCreated( () => {
    Template.instance().subscribe( 'users' );  
  });

Template.userProfileContainer.helpers({
    'user': function() {
        return this.username;
    }
});