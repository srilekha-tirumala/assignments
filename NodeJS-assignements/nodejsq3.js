const request = require('request');
const fs = require('fs');
http = require('http');
https = require('https');

var Stream = require('stream').Transform;
let URLs = [{
    link: 'https://i.ytimg.com/vi/O5u1apUkYV0/maxresdefault.jpg',
    name: 'image35.jpg'
}];


var downloadImagefromtheURL = (url,filename,callback) =>{
    var client = http;
    if(url.toString().indexOf('https')=== 0){
        client = https;
    }
    client.request(url,function(response){
        var data = new Stream();

        response.on('data',function(chunk){
            data.push(chunk);
        });
        response.on('end',function(){
            fs.writeFileSync(filename,data.read());
        });
    }).end();
}
URLs.forEach(url=>{
    downloadImagefromtheURL(url.link,'./NodeJS-assignements/'+url.name)
})


var url = 'https://www.google.com/';

request(url, (error, response, body)=>{
    if(error) console.log(error)
    console.log(response.statusCode);
    // console.log(body);

    fs.writeFile('./NodeJS-assignements/google.txt',body,(error)=>{
        if(error) return error;
    })
});