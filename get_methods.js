var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://127.0.0.1:27017/';

const get_question = _ => {
    return new Promise((resolve => {

        MongoClient.connect(dbUrl, function(err, db) {
            if (err) {
                resolve("this error", error)
                throw err;
            } else {
                console.log("WE CONNECTED")

                var adminDb = db.admin();
                // List all the available databases
                adminDb.listDatabases(function(err, result) {
                    console.log(result.databases);
                    resolve(result.databases)
                    db.close();
                });

            }
        })
    }))
}

module.exports = { get_question: get_question }
