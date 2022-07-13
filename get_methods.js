var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

module.exports = {
    get_question: function () {

    //     MongoClient.connect(url, function(err, db) {
    //         if (err) {
    //             return err
    //         }
    //         var dbo = db.db("questions");
    //         dbo.collection("questions").findOne({}, function(err, result) {
    //             if (err) {
    //                 return err
    //             }
              
    //             db.close();

    //             return result.name

    //         });
    //     });


        return "ok that's right"

    }
  };