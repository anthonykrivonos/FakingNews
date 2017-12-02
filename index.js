let Alexa = require('alexa-sdk');


// Server code

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json({ type: 'application/json' }));

app.post('/', (req, res) => {
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
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
