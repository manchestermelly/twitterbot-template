# grant-holt-robot
 @Manchestermelly's Twitter bot


## Information

This Twitterbot was a very rudimentary bot that creates a Twitter stream (listens for key phrases) and replies appropriately.

It was used for my Photo 52 challenge in 2020. I could tweet to @GrantHoltRobot, asking what the theme for a given week was and he would reply with the theme from his database. He also monitored the time and day of the week and tweeted me reminders at key times.


## To run the bot

* Clone or copy the repo
* Install packages using `yarn install` or `npm install`
* Set up a Twitter developer account and follow the process to create and authorise an app
* Add your credentials to `config.js`
* Start the app with `yarn start` or `npm start`, or start one module with `node module-name.js` (but then you lose the pretty colours in the console)
  

## How it works

There are two modules included in this example:

grant-holt-robot.js
second-module.js

They are identical, apart from a couple of console logs. This is just to show how the `concurrently` package can run multiple modules... ahem... concurrently.







