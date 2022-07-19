require("dotenv").config()

const https = require('https');

var MongoClient = require('mongodb').MongoClient;
const axios = require('axios');

var targetDB = "questions"
var host = "localhost"

var dbUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@${host}/${targetDB}`

const post_new_question = _ => {
    return new Promise((resolve => {

        const options = {
            hostname: 'the-trivia-api.com',
            port: 443,
            path: '/api/questions?limit=5&difficulty=easy',
            method: 'GET',
          };
          
          const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`);
          
            res.on('data', d => {
              process.stdout.write(d);
              console.log(d)
            });
          });
          
          req.on('error', error => {
            console.error(error);
          });
          
          req.end();

          resolve()

    })) 
}

module.exports = { post_new_question: post_new_question }