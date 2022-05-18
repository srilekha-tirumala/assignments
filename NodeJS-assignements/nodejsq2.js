const Handlebars = require('handlebars');
const fs = require('fs');
const format = require('xml-formatter');

const source = '<products>{{#each this}}<product><baseId>{{baseId}}</baseId><isActive>{{isActive}}</isActive><contentType>{{#each contentType}}<contentTypeValue>{{this.value}}</contentTypeValue>{{/each}}</contentType><features>{{#each feature}}<feature>{{this}}</feature>{{/each}}</features><searchTerms>{{#each searchTerms}}<searchTermValue>{{this}}</searchTermValue>{{/each}}</searchTerms><childProducts>{{#each childProducts}}<childProduct><baseId>{{baseId}}</baseId><isActive>{{isActive}}</isActive><features>{{#each feature}}<feature>{{this}}</feature>{{/each}}</features><searchTerms>{{#each searchTerms}}<searchTermValue>{{this}}</searchTermValue>{{/each}}</searchTerms></childProduct>{{/each}}</childProducts></product>{{/each}}</products>'

var template = Handlebars.compile(source);

var data = [{
        "baseId": "1",
        "feature": {
            "1": "parent",
            "2": "first entry"
        },
        "contentType": {
            "1": {
                "value": "pure"
            },
            "2": {
                "value": "mix"
            }
        },
        "isActive": true,
        "childProducts": [{
                "baseId": "1-1",
                "isActive": true
            },
            {
                "baseId": "1-2",
                "isActive": false
            },
            {
                "baseId": "1-3",
                "isActive": true
            },
            {
                "baseId": "1-4",
                "isActive": true,
                "feature": {
                    "1": "parent",
                    "2": "first entry"
                },
                "searchTerms": {
                    "1": "glue",
                    "1": "adhesive",
                    "2": "stick"
                }
            }
        ]
    },
    {
        "baseId": "10",
        "isActive": true,
        "searchTerms": {
            "0": "glue",
            "1": "adhesive",
            "2": "stick"
        },
        "childProducts": [{
                "baseId": "10-1",
                "isActive": true,
                "searchTerms": {
                    "0": "glue"
                }
            },
            {
                "baseId": "10-2",
                "isActive": false
            },
            {
                "baseId": "10-3",
                "isActive": true
            },
            {
                "baseId": "10-4",
                "isActive": true
            }
        ]
    }
];

var result = template(data);
var formatted = format(result);
fs.writeFile('./NodeJS-assignements/handlebar.xml', formatted, (error) => {
    if (error) return error;
});

console.log("converted and saved in handlebar.xml file");