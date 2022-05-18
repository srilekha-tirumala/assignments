const TinyURL = require('tinyurl');
const async = require('async');

var original_urls = ['https://doodleart.redbull.com/assets/managed/entries/processed/sm/367010617181759_36211000.jpg',
    'https://www.justcolor.net/wp-content/uploads/sites/1/nggallery/doodle-art-doodling/coloring-page-adults-doodle-art-rachel.jpg',
    'https://i.pinimg.com/originals/e5/55/a3/e555a39ca5457a079a9bcce59f61f8d5.jpg'
];
function shorten(item, callback) {
    TinyURL.shorten(item, function(res) {
      callback(null, res);
    });
  }
async.map(original_urls, shorten, (err, results) => {
    let all_urls = [...original_urls,...results];
    console.log(all_urls);
  });