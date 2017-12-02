let Alexa = require('alexa-sdk');

let handlers = {
  'IsItTrue': () => {
    // Where our code is
    console.log('This ran!');
    this.response.speak("Hello world!");
    this.emit(':responseReady');
  }
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

// Server code

const express = require('express');
const app = express();

let port = process.env.PORT || 3000;

app.post('/', (req, res) => {
  res.send(`Got request: \n` + JSON.stringify(req));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
