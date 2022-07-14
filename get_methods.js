var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

module.exports = {
    get_question: function () {

        async function findOne() {

            const client = await MongoClient.connect(url, { useNewUrlParser: true })
                .catch(err => { console.log(err); });

            if (!client) {
                return;
            }

            try {

                const db = client.db("questions");

                let collection = db.collection('questions');

                let query = { date: '130722' }

                let res = await collection.findOne(query);
                return res 
                

            } catch (err) {

                console.log(err);

            } finally {

                client.close();
            }
        }

        await findOne();

    }
};