// nlp.js

let nlp = require('compromise');

let percentNLPHit = (list, text) => {
      // Returns null if text is null -> make sure to check for null before calling this function
      if (!text || text == "" || !list || list.length == 0) return null;
      // Stores the sum of all percentages
      let sumPct = 0;
      // Creates an NLP object from text
      text = nlp(text);
      // Maps the list array into elements containing a match text and percentage match
      list = list.map((txt) => {
            let matched = text.match(txt);
            let matchedText = matched.out('text'), matchedPct = matched.out('text').length / text.length || 0;
            // Adds the percentage match between one list item and the text
            sumPct += matchedPct;
            return {
                  match: matchedText,
                  pct: matchedPct
            };
      });
      // Returns the mean percentage match
      return sumPct/list.length;
};
