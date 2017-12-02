// nlp.js

let nlp = require('compromise');

let percentNLPHit = (list, text) => {
      // Returns null if text is null -> make sure to check for null before calling this function
      if (!text || text == "" || !list || list.length == 0) return null;
      // Stores the sum of all percentages
      let sumPct = 0, hash = new Map();
      // Creates an NLP object from text
      text = nlp(text);
      // Maps the list array into elements containing a match text and percentage match
      list = list.map((txt) => {
            txt = nlp(txt);
            let substrs = [],
                  verbs = txt.verbs().out('array'),
                  nouns = txt.nouns().toSingular().out('array'),
                  topics = txt.topics().out('array'),
                  numbers = txt.values().out('array').map((num) => parseInt(num));
            substrs = substrs.concat(verbs, nouns, topics, numbers).sort();
            substrs.forEach((sub) => {
                  let mapped = hash.get(sub);
                  if (mapped != null) hash.set(sub, ++mapped);
                  else hash.set(sub, 1);
            });
      });

      let sortedHash = Array.from(hash).sort((h1, h2) => h1[1] < h2[1]);

      let substrs = [],
            verbs = text.verbs().out('array'),
            nouns = text.nouns().toSingular().out('array'),
            topics = text.topics().out('array'),
            numbers = text.values().out('array').map((num) => parseInt(num));
      substrs = substrs.concat(verbs, nouns, topics, numbers).sort();

      let hits = 0, misses = 0;
      substrs.forEach((sub, idx) => {
            var found = false;
            sHash = sortedHash[idx];
            for (var i = 0; i < sHash.length; i++) {
                  if (sHash[0] == sub) {
                        hits += sHash[1];
                        found = true;
                        break;
                  }
            }
            if (!found) misses++;
      });
      let hitRate = Math.round((hits - misses)/hits * 10)/10;

      return hitRate;
};

console.log(percentNLPHit(["13 cats in the hat", "5 turtles in a cat", "hat in the cat"], "cat in pat"));

module.exports = {
      percentNLPHit
};

// nlp.js
//
// let stringSimilarity = require('string-similarity');
//
// let percentNLPHit = (list, text) => {
//       // Returns null if text is null -> make sure to check for null before calling this function
//       if (!text || text == "" || !list || list.length == 0) return null;
//       // Stores the sum of all percentages
//       let sumPct = 0;
//       // Maps the list array into elements containing a match text and percentage match
//       list = list.map((txt) => {
//             let matched = text.match(txt);
//             sumPct += stringSimilarity.compareTwoStrings(txt, text);
//       });
//       // Returns the mean percentage match
//       return sumPct/list.length;
// };
//
// console.log(percentNLPHit(["cat in the hat", "turtle in a cat", "hat in the cat"], "cat in"));
//
// module.exports = {
//       percentNLPHit
// };
