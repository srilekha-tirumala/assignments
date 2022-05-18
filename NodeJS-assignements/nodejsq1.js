const fs = require('fs');
const xml2js = require('xml2js');

var filePath = ('./NodeJS-assignements/developerforce.xml');
var xmldata = fs.readFileSync(filePath,'utf8');


xml2js.parseString(xmldata, {trim: true},(error,results)=>{
    if(error) return error;
    let data = JSON.stringify(results,null,3);
    console.log(data);

    fs.writeFile('./NodeJS-assignements/convertedjsonfile.json',data,(error)=>{
        if(error) {
            console.log(error);
        } else {
            console.log('Data added to json file');
        } 
    })
})