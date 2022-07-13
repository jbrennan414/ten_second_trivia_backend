const express = require('express')
const app = express()
const port = 3000
var get_questions = require('./get_methods');


var securedRoutes = require('express').Router()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

function middleware(req, res, next) {
  console.log(req.headers.login)

  const login = req.headers.login
  const password = req.headers.password

  console.log(Buffer.from(`${login}:${password}`).toString('base64'));

    // Verify credentials
  // if (req.headers.authorization !== 'c3dhZ2dnZ2dnZzpmb29iYXI='
  //     && req.headers.authorization !== 'Basic b3RoZXJsb2dpbjpvdGhlcnBhc3N3b3Jk')        
  //   return res.status(401).send('Authentication required.') // Access denied.   

    // Access granted...
    next()
}

securedRoutes.use(middleware)

securedRoutes.get('/question', (req, res) => {
  let response = get_questions.get_question()
  res.send(response)

}) 


app.use('/secure', securedRoutes)
app.get('public', /* ... */)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})