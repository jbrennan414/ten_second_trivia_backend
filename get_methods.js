var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
    
async function run() {
    try {

        const client = new MongoClient(url);

        const db = client.db("questions");

        let collection = db.collection('questions');

        const query = { date: '130722' }
  
        const movie = await collection.findOne(query);  

        console.log(movie);
    } finally {
      await client.close();
    }
}



module.exports = {

    
    get_question: function () {

        return run().catch(console.dir);

    }
};