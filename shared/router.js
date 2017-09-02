Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', function () {
    this.render('homeView');
});

Router.route('/search/', function () {
    this.render('searchView', {
      data: function () {
        return { queryParams: this.params.query };
      }
    });
});