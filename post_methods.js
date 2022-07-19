require("dotenv").config()

const axios = require('axios');

const post_new_question = _ => {
    axios
        .get('https://the-trivia-api.com/api/questions?limit=5&difficulty=easy')
        .then(res => {
            console.log(`statusCode: ${res.status}`);
            console.log("resonse from trivia...", res);

        })
        .catch(error => {
            console.error(error);
        });
}

module.exports = { post_new_question: post_new_question }