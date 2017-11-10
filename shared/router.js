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

Router.route('/users/:username/edit', {
    name: 'editUserView',
    template: 'editUserView',
    data: function(){
        return Meteor.users.findOne({ _id: Meteor.userId() });
    },
    onBeforeAction: function(){
        if(Meteor.user() && Meteor.user().username.toLowerCase() === this.params.username.toLowerCase()){
            this.next();
        } else {
            this.redirect('/');
            this.next();
        }
    }
});

Router.route('/users/:username/status/:tweetId', function() {
    this.render('singleTweetView', {
        data: function() {
            return Tweets.findOne(this.params.tweetId);
        }
    });
});

Router.route('/notifications', {
    name: 'notificationsView',
    template: 'notificationsView',
    data: function(){
        return Meteor.users.findOne({ _id: Meteor.userId() });
    },
    onBeforeAction: function(){
        if(Meteor.userId()){
            this.next();
        } else {
            this.redirect('/');
            this.next();
        }
    }
});
