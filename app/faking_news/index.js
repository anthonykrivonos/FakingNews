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
