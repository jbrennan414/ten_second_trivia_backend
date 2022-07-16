require('dotenv').config()

const express = require('express');
const app = express()
const port = 3000

const get_methods = require('./get_methods');

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
  const result1 = await get_methods.get_question()
  // const [result2, result3] = await Promise.all([
  //   get_methods.get_question(),
  //   asyncFunc('my name is'),
  //   asyncFunc('Ionnis')
  // ])

  // const result = `${result1} ${result2} ${result3}`
  return res.send(result1)

})) 

app.use('/secure', securedRoutes)
app.get('public', /* ... */)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})