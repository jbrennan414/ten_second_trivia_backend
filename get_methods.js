var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://127.0.0.1:27017/';

const get_question = _ => {
    return new Promise((resolve => {

        MongoClient.connect(dbUrl, function(err, client) {
            if (err) {
                resolve(error)
                throw err;
            } else {
                console.log("WE CONNECTED")

                const db = client.db('questions')

                db.listCollections().toArray(function(err, items) {

                    console.log(items)
                    
                    resolve(items)
                    client.close();
                    
                });

                // dbo.collection("questions").findOne({"date" : "130722"}, function(err, result) {
                //     if (err) {
                //         console.log("ERROR")
                //     }
                //     db.close()
                // })
            }
        })
    }))
}

module.exports = { get_question: get_question }
