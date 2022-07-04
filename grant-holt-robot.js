console.log('Boot lacing sequence initiated...');

var Twit = require('twit');
var dayjs = require('dayjs');
var _ = require('underscore');
var config = require('./config');
var T = new Twit(config);
var fs = require('fs');
var axios = require("axios").default;

// #region Get time of day and day of week for greeting

function getTimeOfDay() {
    const hour = dayjs().format('HH');

    if (hour >= 0 && hour < 12 || hour === 00) {
        return 'morning';
    }
    else if (hour > 11 && hour <= 17) {
        return 'afternoon';
    }
    else if (hour > 17 && hour < 24) {
        return 'evening';
    }
}

const timeOfDay = getTimeOfDay();

console.log("Good " + timeOfDay + ", Twitter, except those of you who claim Earth is flat, but clearly haven't checked for yourself.");

//#endregion Get time of day and day of week for greeting


// #region Get - Template code for a get request

var params = {
    q: 'sunset prediction',
    count: 15
}

//T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
    console.log('*-*-*-*-*-*-*-*-*-*-*-*-*');
    console.log('DATA FROM GET REQUEST');
    console.log(data);
    console.log('*-*-*-*-*-*-*-*-*-*-*-*-*');

}

// #endregion Get - Template code for a get request

// #region Post - Template code for posting a tweet

var tweet = {
    status: "Hello, world, except those of you who..."
}

//T.post('statuses/update', tweet, tweeted);

function tweeted(err, data, response) {
    console.log(data);
}

// #endregion Post - Template code for posting a tweet

// #region Start a stream

const Twitter = new Twit(config);

const stream = Twitter.stream('statuses/filter', { track: ['flat earth', 'Grant Holt robot', '@GrantHoltRobot', '@grantholtrobot'] });

stream.on('tweet', function (tweet) {

    var replyTo = tweet.in_reply_to_screen_name;
    var text = tweet.text.toLowerCase();
    var from = tweet.user.screen_name;
    var statusID = tweet.id_str;

    console.log('Tweet seen by grant-holt-robot.js');

    // #region Log tweets mentioning Flat Earth

    // (Shows stream is running, but doesn't clog the console too much)

    if (tweet.text.includes('flat') && tweet.text.includes('earth')) {
        console.log(' ');
        console.log('From @', from, ': ', tweet.text);
        console.log(' ');

    }

    // #endregion Log tweets mentioning Flat Earth

    // #region General replies

    if (replyTo === 'GrantHoltRobot') {
        console.log('**********************************************************************');
        console.log('**********************************************************************');
        console.log('General reply received from ', from, ' - Replying to ', statusID);
        console.log(tweet);
        console.log('**********************************************************************');
        console.log('**********************************************************************');

        if (text.includes('theme') && text.includes('week')) {

            //getThemeByNumber(tweet, timeOfDay);


            // Note, I've taken out the getThemeByNumber function, so here I've included a simple reply instead
            const textToReply = "Some string your logic returns";
            //replyToTweet(statusID, textToReply);

        }
        else {
            var b64content = fs.readFileSync('./assets/gifs/learnding.gif', { encoding: 'base64' })
            const textToReply = "Sorry, @" + from + ". I'm not much of a conversationalist yet.";

            //postWithGIF(statusID, textToReply, b64content);
        }

    }


    // #endregion General replies

});

// #endregion Start a stream


// #region Reply to a tweet

function replyToTweet(replyingToID, text) {
    console.log('replying to ', replyingToID);

    T.post('statuses/update', { status: text, in_reply_to_status_id: replyingToID }, replied);

}

function replied() {
    console.log('replied');
}

// #endregion Reply to a tweet

// #region Post a new tweet

function tweetIt(txt) {

    var tweet = {
        status: txt
    }

    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
        if (err) {
            console.log('Oh fuck');
        } else {
            console.log('Locating theme...');
        }
    }

}

// #endregion Post a new tweet

// #region Post a gif

const postWithGIF = (replyingToID, text, b64content) => {

    T.post('media/upload', { media_data: b64content }, function (err, data, response) {
        // now we can assign alt text to the media, for use by screen readers and
        // other text-based presentations and interpreters
        var mediaIdStr = data.media_id_string
        var altText = "Just a gif"
        var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

        T.post('media/metadata/create', meta_params, function (err, data, response) {
            if (!err) {
                // now we can reference the media and post a tweet (media will attach to the tweet)
                var params = { status: text, in_reply_to_status_id: replyingToID, media_ids: [mediaIdStr] }

                T.post('statuses/update', params, function (err, data, response) {
                    console.log(data)
                })
            }
        })
    });

}

  // #endregion Post a gif
