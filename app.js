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

const asyncFunc = (text) => {
  return new Promise((resolve => {
    setTimeout(() => resolve(text), 1000)
  }))
}

securedRoutes.get('/question', asyncHandler(async (req, res) => {
  const dates = req.query.date

  const result1 = await get_methods.get_question(dates)
  // const [result2, result3] = await Promise.all([
  //   get_methods.get_question(),
  //   asyncFunc('my name is'),
  //   asyncFunc('Ionnis')
  // ])

  // const result = `${result1} ${result2} ${result3}`
  return res.send(result1)

})) 

securedRoutes.get('/test', asyncHandler(async (req, res) => {

  const questions = await Promise.all([
    post_methods.post_new_question()
  ]).then(function(results) {
    console.log("SWAG", results)




    
    return res.send(results)
  }).catch(function() {
    console.log("Big test")
  })

}))

// doSomething(function (result) {
//   doSomethingElse(result, function (newResult) {
//     doThirdThing(newResult, function (finalResult) {
//       console.log("Got the final result: " + finalResult);
//     }, failureCallback);
//   }, failureCallback);
// }, failureCallback);

function failureCallback() {
  console.log("fuck")
}

app.use('/secure', securedRoutes)
app.get('public', /* ... */)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
