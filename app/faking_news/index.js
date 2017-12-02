var express = require("express");
var alexa = require("alexa-app");
var express_app = express();

var algorithm = require("./algorithm/algorithm");

var app = new alexa.app("FakingNews");
var port = process.env.port || 3030;

let factChecker = (fact) => {
      factCheck = algorithm.factCheck(fact);
      var output = "";
      if (fact.valid) {
            output = `According to ${factCheck.topSource} and ${factCheck.sourceCount - 1} other sources, this is ${factCheck.percentage} true.`;
      } else {
            output = `This is likely fake news and only ${factCheck.percentage} true.`;
      }
      return output;
};

app.intent("IsItTrue", {
            "slots": { "Fact": "AMAZON.LITERAL" },
            "utterances": ["that {Donald Trump is orange|Fact}"]
      }, (request, response) => {
            var fact = request.slot("Fact");
            response.say(factChecker(fact));
      }
);

app.intent("AskFakingNews", {
            "slots": { "Fact": "AMAZON.LITERAL" },
            "utterances": ["if {Donald Trump is orange|Fact}"]
      }, (request, response) => {
            var fact = request.slot("Fact");
            response.say(factChecker(fact));
      }
);

app.intent("IsItFakeNews", {
            "slots": { "Fact": "AMAZON.LITERAL" },
            "utterances": ["that {Donald Trump is orange|Fact}"]
      }, (request, response) => {
            var fact = request.slot("Fact");
            response.say(factChecker(fact));
      }
);

console.log(`Schemas:\n${app.schemas.intent()}`);
console.log(`Utterances:\n${app.utterances()}`);

app.express({ expressApp: express_app, checkCert: false, debug: true });

express_app.set("view engine", "ejs");

app.launch(function(request, response) {
      response.say("Faking News launched!");
});

express_app.listen(port);

module.exports = app;
