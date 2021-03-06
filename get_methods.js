require("dotenv").config()

var MongoClient = require('mongodb').MongoClient;

var targetDB = "questions"
var host = "localhost"

var dbUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@${host}/${targetDB}`

const get_question = (todaysDate) => {
    return new Promise((resolve => {

        MongoClient.connect(dbUrl, function(err, client) {
            if (err) {
                resolve(`${err}`)
                throw err;
            } else {
                console.log("WE CONNECTED")

                const db = client.db('questions');
                const questionsCollection = db.collection("questions");

                const query = { date: todaysDate };

                const ourResult = questionsCollection.findOne(query);

                resolve(ourResult)

            }
        })
    }))
}

module.exports = { get_question: get_question }