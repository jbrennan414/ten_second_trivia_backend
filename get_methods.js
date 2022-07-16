require("dotenv").config()

var MongoClient = require('mongodb').MongoClient;

var targetDB = "questions"
var host = "localhost"

var dbUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@${host}/${targetDB}`

const get_question = _ => {
    return new Promise((resolve => {

        MongoClient.connect(dbUrl, function(err, client) {
            if (err) {
                resolve(`${err}`)
                throw err;
            } else {
                console.log("WE CONNECTED")

                const db = client.db('questions');

                db.listCollections().toArray((err, collections) => {

                    if (err) { resolve(err) }

                    console.log(collections);

                    resolve(collections)
             
                    client.close();
                 });
            }
        })
    }))
}

module.exports = { get_question: get_question }