Template.createTweetContainer.events({
    'submit form': (event) => {
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
    }
});