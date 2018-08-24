const express = require('express')
const path = require('path')
//const PDFDocument = require('pdfkit')
const PORT = process.env.PORT || 5000
const app = express()

app.get('/', (req, res) => res.send('<h2> Hello Altomatik! </h2>'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

var REDISTOGO_URL = "redis://redistogo:e013a4d1c249922d9835fe68ae0ac666@tetra.redistogo.com:9180/";

var rtg   = require("url").parse(REDISTOGO_URL);
var redis = require("redis").createClient(rtg.port, rtg.hostname);
redis.auth(rtg.auth.split(":")[1]);

var displayContent = function(){
    redis.get("nama", function(err, reply){
        console.log("Nama : "+reply);
        redis.expire("nama", 1);    
    });

    redis.get("email", function(err, reply){
        console.log("Email : "+reply);
        redis.expire("email", 1);    
    });
};

redis.on("connect", function(){
    redis.set("nama", "Anton Purwanto");
    redis.set("email", "anton.takaful@gmail.com");
    displayContent();
});

