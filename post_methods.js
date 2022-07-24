require("dotenv").config()

var MongoClient = require('mongodb').MongoClient;

var targetDB = "questions"
var host = "localhost"

var dbUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@${host}/${targetDB}`

const axios = require('axios');

const get_questions = () => {
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

function post_to_mongo (result) {
    return new Promise((resolve => {

        MongoClient.connect(dbUrl, function(err, client) {
            if (err) {
                resolve(`${err}`)
                throw err;
            } else {

                const db = client.db('questions');
                const questionsCollection = db.collection("questions");

                const today = new Date()
                const dayString = `${parseDates(today.getDate())}${parseDates(today.getMonth()+1)}${today.getFullYear()}`

                const insertObject = { 
                    _id: Date.now(),
                    date: dayString,
                    question: result
                 };

                const ourResult = questionsCollection.insertOne(insertObject).catch(error => {
                    console.log("error inserting", error)
                })
                resolve(ourResult)

            }
        })
    }))
}

//add a preceding zero when we need it
function parseDates(rawValue) {
    let newDate = rawValue

    if (rawValue < 10) {
        newDate = `0${rawValue}`
    }

    return newDate

}

async function addNewQuestionsToMongo() {
    
    const question = await get_questions()
    const writeToMongo = await post_to_mongo(question)
    
    return writeToMongo

}

addNewQuestionsToMongo()
