const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors');
const fileUpload = require('express-fileupload');

mongoose.connect('mongodb://localhost:27017/chat_app', {
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

app.use(express.json());

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use(cors());

app.use('/', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`server is running on ${PORT}`));