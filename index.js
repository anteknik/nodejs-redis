const express = require('express')
const path = require('path')
const PDFDocument = require('pdfkit')
const PORT = process.env.PORT || 5000
const app = express()

	var REDISTOGO_URL = "redis://redistogo:e013a4d1c249922d9835fe68ae0ac666@tetra.redistogo.com:9180/"
    var rtg   = require("url").parse(REDISTOGO_URL);
    var redis = require("redis").createClient(rtg.port, rtg.hostname);
    redis.auth(rtg.auth.split(":")[1])
        
	var fs = require('fs')
    var doc = new PDFDocument()
    doc.text('Hello Altomatik')
    
    var displayContent = function(){
        redis.get("nama", function(err, reply){
            console.log("Nama : "+reply)
            var nama = doc.text('Nama : '+reply)
            redis.expire("nama", 1)    
        })

        redis.get("email", function(err, reply){
            console.log("Email : "+reply)
            var nama = doc.text('Email : '+reply)
            redis.expire("email", 1)    
        })
		
		redis.get("message", function(err, reply){
            console.log("Mesagge : "+reply)
            var nama = doc.text('Message : '+reply)
            redis.expire("message", 1)    
        })
    }

    redis.on("connect", function(){
        redis.set("nama", "Anton Purwanto")
        redis.set("email", "anton.takaful@gmail.com")
		redis.set("message", "belajar setting environment nodejs dan redis")
        displayContent();
    })


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

app.get('/', (req, res) =>{ 
    res.send('<h2>Hello Altomatik </h2><a href="/my/pdf">Download Pdf</a> ')
    console.log('hello')
})

app.get('/my/pdf', (req, res) =>{

    console.log('disi ini fungsi buat pdf ')
    //doc.pipe(res)
    doc.pipe(
        fs.createWriteStream('report/hello-altomatik.pdf')  
      )
        .on('finish', function () {
          console.log('PDF created');
        })
	
// Close PDF and write file.
    doc.end()
    res.status(200).send('<h4><a href="/my/pdf/view">Lihat File</a></h4>')
})

app.get('/my/pdf/view', (req, res) =>{

    //res.setHeader('Content-disposition', 'attachment; filename=hello.pdf')
	//res.set('Content-Type', 'text/pdf')
    var filepath = "report/hello-altomatik.pdf"
    //res.download('report/hello-altomatik.pdf')
    fs.readFile(filepath , function (err,data){
        res.contentType("application/pdf")
    res.send(data)
    console.log('PDF view or dowload');
})
    

})

