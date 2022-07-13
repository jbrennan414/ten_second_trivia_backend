require('dotenv').config()

const express = require('express');
const app = express()
const port = 3000

const get_questions = require('./get_methods');

var securedRoutes = require('express').Router()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

function middleware(req, res, next) {

  // hash login/password client side, send as an auth header
  console.log(req.headers.authorization)
  console.log(process.env.BASIC_AUTH)

  // Verify credentials
  if (req.headers.authorization !== process.env.BASIC_AUTH) {        
    return res.status(401).send('Authentication required.') // Access denied.   
  }

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