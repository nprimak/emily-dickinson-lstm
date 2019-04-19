const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'https://www.poemhunter.com/emily-dickinson/poems/';
const emilyPoemHunterParse = require('./emilyPoemHunterParse');
//const url = 'https://www.reddit.com';
const fs = require('fs');
var poemUrls = [];
var oldHTML = '';
const selectorForLoadMoreButton = '.next > a';

(async () => {

const browser = await puppeteer.launch({ headless : false });
const page = await browser.newPage();
await page.goto(url);
const numberOfPages = 31;


          await page.waitFor(2000);
          let html = await page.content();
          addPoemUrls(html);    
        

        for(var i = 0; i < numberOfPages; i++){
             await Promise.all([
                page.click(selectorForLoadMoreButton),
                page.waitFor(3000)
              ]).catch(e => console.log(e)); 
              let html = await page.content().catch(e => console.log(e));
              addPoemUrls(html);
              console.log('poemUrls', poemUrls);
        } 

        await browser.close().catch(e => console.log(e));

        // var promise = Promise.all(
        poemUrls.map(function(url, index) {
            emilyPoemHunterParse('http://www.poemhunter.com' + url, index);
        }
      );
      // promise.then(function(text) {
      //   console.log('text', text);
      //  fs.writeFile("emily1.txt", text, function(err) {
      //     if(err) {
      //     return console.log(err);
      //     } else {
      //     console.log('saved');
      //     }
  
      //   })
    //  })
      // promise.catch(function(err) {
      //   console.log('error', err);
      // //handle error
      // });

  
      function addPoemUrls(html) { 
        if(oldHTML !== html) {
          oldHTML = html;
          var poemsHTML = $('.title > a', html);
          for (var i = 1; i < poemsHTML.length; i++) {
            poemUrls.push(poemsHTML[i].attribs.href);
         }
        }
       }
  
})();


