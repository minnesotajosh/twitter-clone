Template.createTweet.events({
    'submit form': (event) => {
        event.preventDefault();

        let formArray = $(event.target).serializeArray();
        let tweet = {};

        for (let i = 0; i < formArray.length; i++) {
            tweet[formArray[i].name] = formArray[i].value;
        }
        Meteor.call('insertTweet', tweet);
        event.target.reset();
    }
});

Template.createTweet.helpers({
    test: () => {
        console.log('test!');
    }
});