const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb//localhost:27017/chat_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('connected to the database');
    })
    .catch(err => {
        console.log('cannot connect to the database', err);
        process.exit();
    });

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello worldd</h1>');
});

// app.post()

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`server is running on ${PORT}`));