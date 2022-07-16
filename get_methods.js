require("dotenv")

var MongoClient = require('mongodb').MongoClient;
// var dbUrl = 'mongodb://127.0.0.1:27017/';

var dbUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@127.0.0.1:27017/`

const get_question = _ => {
    return new Promise((resolve => {

        MongoClient.connect(dbUrl, function(err, client) {
            if (err) {
                resolve("this error", error)
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
