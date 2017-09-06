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

Router.route('/users/:userName', function() {
    this.render('userView', {
        data: function() {
            // Meteor.subscribe('users');            
            return Meteor.users.findOne({username: this.params.userName});            
        }
    });
});