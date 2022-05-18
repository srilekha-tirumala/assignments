const request = require('request');
const fs = require('fs');
http = require('http');
https = require('https');
const JSZip = require('jszip');

const zip = new JSZip();

var Stream = require('stream').Transform;

let URLs = [{
        link: "https://doodleart.redbull.com/assets/managed/entries/processed/sm/367010617181759_36211000.jpg",
        name: 'image1.jpg'
    },
    {
        link: "https://www.justcolor.net/wp-content/uploads/sites/1/nggallery/doodle-art-doodling/coloring-page-adults-doodle-art-rachel.jpg",
        name: 'image2.jpg'
    },
    {
        link: "https://i.pinimg.com/originals/e5/55/a3/e555a39ca5457a079a9bcce59f61f8d5.jpg",
        name: 'image3.jpg'
    },
    {
        link: "https://i.pinimg.com/originals/ef/4c/91/ef4c91fb73e61e19211a0589187ccaa6.jpg",
        name: 'image4.jpg'
    },
    {
        link: "https://static.vecteezy.com/system/resources/previews/000/107/464/non_2x/huge-doodle-vector-pack.jpg",
        name: 'image5.jpg'
    },
    {
        link: "https://i.ytimg.com/vi/O5u1apUkYV0/maxresdefault.jpg",
        name: 'image6.jpg'
    },
    {
        link: "https://media.glassdoor.com/l/e9/c1/7a/84/independence-day-celebration.jpg",
        name: 'image7.jpg'
    },
];
let dir = './NodeJS-assignements/demo-testing-images';
fs.mkdir(dir, (err) => {
    if (err) return err;
})

var downloadImagefromtheURL = (url, filename, callback) => {
    var client = http;
    if (url.toString().indexOf('https') === 0) {
        client = https;
    }
    client.request(url, function (response) {
        var data = new Stream();

        response.on('data', function (chunk) {
            data.push(chunk);
        });
        response.on('end', function () {
            fs.writeFileSync(filename, data.read());
        });
    }).end();
}

URLs.forEach(url => {
    downloadImagefromtheURL(url.link, dir + '/' + url.name);
    console.log(url.name + ' downloaded');

    function resolveAfter1Second() {
        return new Promise(resolve => {
            setTimeout(() => {
                try {
                    let archive = fs.readFileSync(dir + '/' + url.name);
                    zip.file(dir + '/' + url.name, archive);
                    zip.generateNodeStream({
                            type: 'nodebuffer',
                            streamFiles: true
                        })
                        .pipe(fs.createWriteStream('./NodeJS-assignements/demo.zip'))
                        .on('finish', function () {});
                } catch (err) {
                    console.log(err);
                }
            }, 1000);
        });
    }
    async function asyncCall() {
        const result = await resolveAfter1Second();
        console.log(result);
    }
    asyncCall();

});
console.log("zip file created");