const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const authToken = require('./routes/verifyToken');

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

// app.get('/', (req, res) => {
//     res.send('<h1>sdasd</h1>')
// })

app.use(express.json({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
}));

app.use(cors());

app.use('/', routes);

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    // useTempFiles : true,
    // tempFileDir : '/tmp/'
}));

app.post('/settings', authToken, (req, res) => {
    console.log(req.user);
    console.log(req.files);
    if(!req.files) return res.status(400).send({errorMessage: 'No file was uploaded'});
    
    const file = req.files.file;
    console.log(file);

    file.mv(`${__dirname}/uploads/${file.name}`, err => {
        if(err) {
            console.log('kurwa');
            res.status(500).send(err);
        }

        res.send({fileName: file.name, filePath: `server/uploads/${file.name}`});
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`server is running on ${PORT}`));