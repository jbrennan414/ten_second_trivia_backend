require("dotenv").config()

var MongoClient = require('mongodb').MongoClient;
const axios = require('axios');

var targetDB = "questions"
var host = "localhost"

var dbUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@${host}/${targetDB}`

const post_new_question = _ => {
    axios
        .get('https://the-trivia-api.com/api/questions?limit=5&difficulty=easy')
        .then(res => {
            console.log(`statusCode: ${res.status}`);
            console.log("resonse from trivia...", res);

            MongoClient.connect(dbUrl, function(err, client) {

                if (err) {
                    console.log(`That was an error ${err}`)
                    resolve(err)
                }

                const db = client.db('questions');
                const questionsCollection = db.collection("questions");

                const document = { 
                    date: "180722",
                    question: res
                };

                const ourResult = questionsCollection.insertOne(document)

                resolve(ourResult)

            })

        })
        .catch(error => {
            console.error(error);
        });
}

module.exports = { post_new_question: post_new_question }