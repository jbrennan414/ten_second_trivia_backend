require('dotenv').config()

const express = require('express');
const cron = require('node-cron');

const app = express()
const port = 3000

const get_methods = require('./get_methods');
const post_methods = require('./post_methods')

var securedRoutes = require('express').Router()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

function middleware(req, res, next) {
  // hash login/password client side, send as an auth header
  // Verify credentials
  if (req.headers.authorization !== process.env.BASIC_AUTH) {        
    return res.status(401).send('Authentication required.') // Access denied.   
  }

  // Access granted...
  next()
}

securedRoutes.use(middleware)

const asyncHandler = (fun) => (req, res, next) => {
  Promise.resolve(fun(req, res, next))
  .catch(next)
}

securedRoutes.get('/question', asyncHandler(async (req, res) => {
  const dates = req.query.date

  const result = await get_methods.get_question(dates)
  return res.send(result)

})) 

securedRoutes.get('/new_question', asyncHandler(async (req, res) => {

  const questions = await Promise.all([
    post_methods.post_new_question()
  ]).then(async function(results) {
      const foo = await Promise.all([
      post_methods.post_to_mongo(results)
    ]).then(function(anotherResult) {
      return res.send(anotherResult) 
    })
  }).catch(function() {
    console.log("we had an error writing to the db")
  })
}))

app.use('/secure', securedRoutes)
app.get('public', /* ... */)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
