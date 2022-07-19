require("dotenv").config()

var MongoClient = require('mongodb').MongoClient;

var targetDB = "questions"
var host = "localhost"

var dbUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@${host}/${targetDB}`

const axios = require('axios');

const post_new_question = _ => {
    console.log("post new question")
    axios
        .get('https://the-trivia-api.com/api/questions?limit=5&difficulty=easy')
        .then(res => {
            console.log(`statusCode: ${res.status}`);
            console.log("resonse from trivia...", res);

            await postToMongo(res)

        })
        .catch(error => {
            console.error(error);
        });
}

const postToMongo = (todayquestion) => {

    console.log("tryna post to mongo")

    return new Promise((resolve => {

        MongoClient.connect(dbUrl, function(err, client) {
            if (err) {
                resolve(`${err}`)
                throw err;
            } else {
                console.log("WE CONNECTED")

                const db = client.db('questions');
                const questionsCollection = db.collection("questions");

                const doc = {
                    date: "180722",
                    question: todayquestion,
                }

                const ourResult = await questionsCollection.insertOne(doc);

                resolve(ourResult)
            }
        })
    }))
}



module.exports = { post_new_question: post_new_question }