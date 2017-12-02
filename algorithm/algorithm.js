// algorithm/algorithm.js

// imports
let dotenv = require('dotenv').config();
let search = require('./search');
let clickbait = require('./clickbait');

// to be removed
var stringtester = "Donald Trump is Orange"
//

let factCheck = (text) => {
     search.search(text).then((res)=>{
            // first test
            // weeds out fake sites
            let results = res.filter((r)=>{
                  return !clickbait.includes(r.domain);
            });

            // second test
     })
}
     

module.exports ;{
      factCheck;
};
