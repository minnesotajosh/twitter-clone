Template.createTweetContainer.onCreated( () => {
    Session.set('characters', $('[data="tweet-box"]').text().length);
  });

Template.createTweetContainer.events({
    'submit form': function(event) {
        event.preventDefault();

        let formArray = $(event.target).serializeArray();
        let tweet = {};

        for (let i = 0; i < formArray.length; i++) {
            tweet[formArray[i].name] = formArray[i].value;
        }

        //since tweet-box is contenteditable div instead of form element:
        let tweetBox = $(event.target).find('[data="tweet-box"]');
        tweet.tweetData = tweetBox.html();
        Meteor.call('tweets.insertTweet', tweet);
        event.target.reset();
        tweetBox.html('');
    },
    'keyup [data="tweet-box"]': function(event) {
        if (event.keyCode === 13) {
            let characters = 144 - (Session.get('characters') || 0);
            if (characters >= 0) {
                $(event.target).closest('form').submit();
            }
        }
    },
    'input [data="tweet-box"]': function(event) {
        let characters = $(event.target).text().length;
        Session.set('characters', characters);
    }
});

Template.createTweetContainer.helpers({
    characterLimit: function() {
        let characters = Session.get('characters');
        return 144 - (characters || 0);
    },
    characterLimitStatus: function() {
        let characters = 144 - (Session.get('characters') || 0);
        let status = '';
        if (characters < 1) {
            status = 'error';
        } else if (characters < 20) {
            status = 'warning'
        }
        return status;
    }
});