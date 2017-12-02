// search.js
let google = require('google');

let clickbait = require('./clickbait');

let GOOGLE_SEARCH = process.env.GOOGLE_SEARCH;

let search = (text) => {
      return new Promise((resolve, reject) => {
            google.resultsPerPage = 25;
            var nextCounter = 0
            if (!text || text.length == 0) reject();
            google(text, (err, res) => {
                  console.log('Googling it');
                  if (err) reject(err);
                  else {
                        console.log('Googled it');
                        let results = (res.links || []).filter((res) => res.title != "" && res.description != "" && res.link != "").map((lnk) => parseResult(lnk.title, lnk.description, lnk.link));
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
      console.log('Parsing domain');
      try {
            if (!url || url == "") return "";
            var match = (url || "").match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
            if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) return match[2];
            else return "";
      } catch (e) {
            console.log('Could not parse domain');
            return "";
      }
};

module.exports = {
      search
};
