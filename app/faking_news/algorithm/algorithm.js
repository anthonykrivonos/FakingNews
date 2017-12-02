// algorithm/algorithm.js

// imports
let dotenv = require('dotenv').config();
let search = require('./search');
let nlp = require('./nlp');
let clickbait = require('./clickbait');

// constants
const THRESHOLD = {
      PERCENTAGE: 0.7,
      SOURCES: 5
};

let factCheck = (text) => {
     search.search(text).then((res)=>{
            // first test
            // weeds out fake sites
            let results = res.filter((r)=>{
                  return !clickbait.includes(r.domain);
            });
            
            // second test
            let pctHit = nlp.percentNLPHit(results.map((r) => r.description), text);
            if (results.length >= THRESHOLD.SOURCES && pctHit >= THRESHOLD.PERCENTAGE) {
                  return {
                        valid: true,
                        percentage: `${pctHit*100}%`,
                        topSource: results[0]['domain'],
                        sourceCount: results.length,
                        originalText: text
                  }
            } else {
                  valid: false,
                  percentage: `${pctHit*100}%`,
                  topSource: null,
                  sourceCount: 0,
                  originalText: text
            }
     })
}


module.exports ;{
      factCheck;
};
