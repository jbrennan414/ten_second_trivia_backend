var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://127.0.0.1:27017/';

const get_question = _ => {
    return new Promise((resolve => {

        MongoClient.connect(dbUrl, function(err, db) {
            if (err) {
                resolve(error)
                throw err;
            } else {
                console.log("WE CONNECTED")

                const swag = db.listCollections()
                resolve(swag)

                // var dbo = db.db("questions")
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
