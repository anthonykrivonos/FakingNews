// search.js
let google = require('google');

let clickbait = require('./clickbait');

let GOOGLE_SEARCH = process.env.GOOGLE_SEARCH;

let search = (text) => {
      return new Promise((resolve, reject) => {
            google.resultsPerPage = 25
            var nextCounter = 0
            if (!text || text.length == 0) reject();
            google(text, (err, res) => {
                  if (err) reject(err);
                  else {
                        let results = (res.links || []).map((lnk) => parseResult(lnk.title, lnk.description, lnk.link)).filter((res) => res.title != "");
                        resolve(results);
                  }
            });
      });
};

let parseResult = (title, description, link) => {
      return {
            title,
            description,
            link,
            domain: parseDomain(link)
      }
};

let parseDomain = (url) => {
      var match = (url || "").match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
      if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) return match[2];
      else return null;
};

module.exports = {
      search
};
