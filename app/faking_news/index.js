var express = require("express");
var alexa = require("alexa-app");
var express_app = express();

var algorithm = require("./algorithm/algorithm");

var app = new alexa.app("FakingNews");
var port = process.env.port || 3030;

let factChecker = (fact) => {
      return new Promise((resolve, reject) => {
            console.log(`Checking fact: ${fact}`);
            algorithm.factCheck(fact).then((factCheck) => {
                  resolve(`According to ${factCheck.topSource} and ${factCheck.sourceCount - 1} other sources, this is ${factCheck.percentage} true.`);
            }).catch((factCheck) => {
                  reject(`This is likely fake news and only ${factCheck.percentage} true.`);
            });
      });
};

app.intent("IsItTrue", {
            "slots": { "Fact": "AMAZON.LITERAL" },
            "utterances": ["that {Donald Trump is orange|Fact}"]
      }, (request, response) => {
            var fact = request.slot("Fact");
            factChecker(fact).then((res) => response.say(res)).catch((err) => response.say(err));
      }
);

app.intent("AskFakingNews", {
            "slots": { "Fact": "AMAZON.LITERAL" },
            "utterances": ["if {Donald Trump is orange|Fact}"]
      }, (request, response) => {f
            var fact = request.slot("Fact");
            factChecker(fact).then((res) => response.say(res)).catch((err) => response.say(err));
      }
);

app.intent("IsItFakeNews", {
            "slots": { "Fact": "AMAZON.LITERAL" },
            "utterances": ["that {Donald Trump is orange|Fact}"]
      }, (request, response) => {
            var fact = request.slot("Fact");
            factChecker(fact).then((res) => response.say(res)).catch((err) => response.say(err));
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
