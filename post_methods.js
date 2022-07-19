require("dotenv").config()

var MongoClient = require('mongodb').MongoClient;

var targetDB = "questions"
var host = "localhost"

var dbUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@${host}/${targetDB}`

const axios = require('axios');

// const post_new_question = async () => {
const post_new_question = _ => {
    return new Promise((resolve => {

        console.log("post new question")
        axios
            .get('https://the-trivia-api.com/api/questions?limit=5&difficulty=easy')
            .then(res => {
                console.log(`statusCode: ${res.status}`);
                console.log("resonse from trivia...", res);

                await postToMongo(res)
                resolve()
            })
            .catch(error => {
                console.error(error);
                resolve()
            });
    }))
}

module.exports = { post_new_question: post_new_question }