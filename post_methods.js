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

                MongoClient.connect(dbUrl, function(err, client) {

                    if (err) {
                        resolve(`${err}`)
                        throw err;
                    } else {

                        const db = client.db('questions');
                        const questionsCollection = db.collection("questions");
        
                        const query = { 
                            date: "180722",
                            question: d
                        };

                        const ourResult = questionsCollection.insertOne(query);
                        resolve()
                    }
                })
            });
          });
          
          req.on('error', error => {
            console.error(error);
          });
          
          req.end();


    })) 
}

module.exports = { post_new_question: post_new_question }