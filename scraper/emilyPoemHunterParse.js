const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs');

const emilyPoemHunterParse = function(url, index) {
	return rp(url)
	.then(function(html) {

		var text = '';
		if($('.KonaBody > p', html).length > 0) {
			$('.KonaBody > p ', html).each(function() {
		    	var string = ($(this).text());
		    	string = string.replace(/([A-Z])/g, ' $1').trim();
		    	string = string.replace(new RegExp("[0-9]", "g"), '');
		   
 					text +=  string + '\r\n';
		  
		    })
		} 
		   
		   fs.appendFile("emily1.txt", text, function(err) {
          if(err) {
          return console.log(err);
          } else {
          console.log('saved');
          }
  
        })
	
	})
};

module.exports = emilyPoemHunterParse;