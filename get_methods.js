        // var MongoClient = require('mongodb').MongoClient;
        // var database = undefined;
        // var dbUrl = 'mongodb://127.0.0.1:27017/';

        //     MongoClient.connect(dbUrl, function(err, db) {
        //         if (err) {
        //                 throw err;
        //             } else {
        //             console.log("WE CONNECTED")
        //             var dbo = db.db("questions")
        //             dbo.collection("questions").findOne({"date" : "130722"}, function(err, result) {
        //             if (err) {
        //                 console.log("ERROR")
        //             }
        //             console.log("OMG", result)
        //             db.close()
        //             })
        //             }
        //     })



const get_question = _ => {
    return new Promise((resolve => {
        setTimeout(() => resolve("that worked"), 5000);
    }))
}

module.exports = { get_question: get_question }
