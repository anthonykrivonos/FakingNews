var express = require("express");
var alexa = require("alexa-app");
var express_app = express();

var app = new alexa.app("FakingNews");
var port = process.env.port || 3030;

app.intent("IsItTrue", {
            "slots": { "Fact": "AMAZON.LITERAL" },
            "utterances": ["IsItTrue that {Donald Trump is orange|Fact}"]
      }, (request, response) => {
            var fact = request.slot("Fact");
            // Fact Checking code
            response.say(`The answer to ${fact} is yes.`);
      }
);

console.log(app.schemas.intent());

app.express({ expressApp: express_app, checkCert: false, debug: true });

express_app.set("view engine", "ejs");

app.launch(function(request, response) {
      response.say("Faking News launched!");
});

express_app.listen(port);

module.exports = app;
