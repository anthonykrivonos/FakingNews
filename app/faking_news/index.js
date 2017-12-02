var express = require("express");
var alexa = require("alexa-app");
var express_app = express();

var algorithm = require("./algorithm/algorithm");

var app = new alexa.app("FakingNews");
var port = process.env.port || 3030;

let factChecker = (fact) => {
      return new Promise((resolve, reject) => {
            console.log(`Checking fact: ${fact}`);
            if (fact && fact != "") {
                  algorithm.factCheck(fact).then((fc) => {
                        resolve(`According to ${fc.topSource} and ${fc.sourceCount - 1} other sources, this is ${fc.percentage} true.`);
                  }).catch((fc) => {
                        reject(`This is likely fake news and only ${fc.percentage} true.`);
                  });
            } else reject(`This is likely fake news and 0% true.`);
      });
};

app.intent("IsItTrue", {
            "slots": { "Fact": "AMAZON.LITERAL" },
            "utterances": ["that {Donald Trump is orange|Fact}"]
      }, (request, response) => {
            var fact = request.slot("Fact");
            return factChecker(fact).then((res) => {
                  response.say(res);
                  return response.send();
            }).catch((err) => {
                  response.say(err);
                  return response.send();
            });
      }
);

app.intent("AskFakingNews", {
            "slots": { "Fact": "AMAZON.LITERAL" },
            "utterances": ["if {Donald Trump is orange|Fact}"]
      }, (request, response) => {f
            var fact = request.slot("Fact");
            return factChecker(fact).then((res) => {
                  response.say(res);
                  return response.send();
            }).catch((err) => {
                  response.say(err);
                  return response.send();
            });
      }
);

app.intent("IsItFakeNews", {
            "slots": { "Fact": "AMAZON.LITERAL" },
            "utterances": ["that {Donald Trump is orange|Fact}"]
      }, (request, response) => {
            var fact = request.slot("Fact");
            return factChecker(fact).then((res) => {
                  response.say(res);
                  return response.send();
            }).catch((err) => {
                  response.say(err);
                  return response.send();
            });
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
