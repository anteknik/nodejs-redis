const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .get('/', (req, res) => res.send('<h2> Hello Altomatik! </h2>'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  
  