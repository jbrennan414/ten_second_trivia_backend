require("dotenv").config()

var MongoClient = require('mongodb').MongoClient;

var targetDB = "questions"
var host = "localhost"

var dbUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@${host}/${targetDB}`

const axios = require('axios');

const post_new_question = () => {
    return new Promise((resolve => {
        axios
            .get('https://the-trivia-api.com/api/questions?limit=5&difficulty=easy')
            .then(res => {
                let json = JSON.stringify(res.data)
                resolve(json)
            })
            .catch(error => {
                console.error(error);
                resolve()
            });
    }))
}

function post_to_mongo () {
    setTimeout(() => {
        console.log("you are done waiting!")
        return "fucking wait for me"
    }, 3000);
}

module.exports = { 
    post_new_question: post_new_question,
    post_to_mongo: post_to_mongo
}