Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', function () {
    this.render('homeView', {
        data: function() {
            return  Meteor.users.findOne({ _id: Meteor.userId() });
        }
    });
});

Router.route('/search/', function () {
    this.render('searchView', {
      data: function () {
        return { queryParams: this.params.query };
      }
    });
});

Router.route('/users/:username', function() {
    this.render('userView', {
        data: function() {
            return Meteor.users.findOne({username: this.params.username});            
        }
    });
});

Router.route('/users/:username/notifications', {
    name: 'notificationsView',
    template: 'notificationsView',
    data: function(){
        return Meteor.users.findOne({username: this.params.username});                    
    },
    waitOn: function () {
        return Meteor.subscribe('users');
    },    
    onBeforeAction: function(){
        let user = Meteor.users.findOne({username: this.params.username});            
        let currentUser = Meteor.userId();
        if(currentUser && currentUser === user._id){
            this.next();
        } else {
            this.redirect('/');
            this.next();
        }
    }
});