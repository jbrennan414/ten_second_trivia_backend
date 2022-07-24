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
                console.log("we got a response from the api, let's respond")
                let json = JSON.stringify(res.data)
                resolve(json)
            })
            .catch(error => {
                console.log("we got an error from the api", error)
                resolve()
            });
    }))
}

function post_to_mongo (result) {
    console.log("we are attempting to post to mongo...")
    return new Promise((resolve => {

        MongoClient.connect(dbUrl, function(err, client) {
            if (err) {
                console.log("unable to connect to db", err)
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

                const ourResult = questionsCollection.insertOne(insertObject)
                    .then(() => {
                        console.log("we successfully added the row")
                        resolve(ourResult)
                    })
                    .catch(error => {
                        console.log("error inserting", error)
                    })
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
    console.log("beginning to add new questions to mongo...")
    const question = await get_questions()
    const writeToMongo = await post_to_mongo(question)
    
    process.exit()

}

module.exports = { addNewQuestionsToMongo: addNewQuestionsToMongo }