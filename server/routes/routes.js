require('dotenv').config();
const router = require('express').Router();
const User = require('../model/user');
const Room = require('../model/roomModel');
const addUserToRoom = require("../services/room");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation/validation');
const authToken = require('./verifyToken');
const { v4: uuidv4 } = require('uuid');


router.post('/register', async (req, res) => {
    const { username, password: plainTextPassword, email } = req.body;
    
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send({errorMessage: error.details[0].message, path: error.details[0].path[0]});

    // Checking if email is already in db
    const emailDuplicate = await User.findOne({email: email});
    if (emailDuplicate) return res.status(400).send({errorMessage: 'Email adress already exists', path: 'email'});

    // Checking if username is already in db
    const usernameDuplicate = await User.findOne({username: username});
    if (usernameDuplicate) return res.status(400).send({errorMessage: 'Username already exists', path: 'username'});

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassowrd = await bcrypt.hash(plainTextPassword, salt)

    // Creating new user
    const user = new User({
        username: username,
        password: hashPassowrd,
        email: email
    });
    try {
        const result = await user.save()
        const {__v, userAvatar, password, ...data} = await result.toJSON();
        res.send(data);
    } catch(err) {
        res.status(400).send(err);
        console.log(err.code);
    }
});

router.post('/login', async (req, res) => {
    const { password, email } = req.body;

    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({errorMessage: error.details[0].message, path: error.details[0].path[0]});

    // Checking if email is in db
    const userExists = await User.findOne({email: email});
    if (!userExists) return res.status(400).send({errorMessage: 'Email is not found', path: 'email'});

    // Checking if password is correct
    const validPassword = await bcrypt.compare(password, userExists.password);
    if (!validPassword) return res.status(400).send({errorMessage: 'Password is wrong', path: 'password'});

    const generateToken = jwt.sign({id: userExists._id}, process.env.TOKEN_SECRET, { expiresIn: '86400s' });
    res.send({accessToken: generateToken});
});

router.get('/auth/user', authToken, async (req, res) => {
    try {
        const userData = await User.findOne({_id: req.user.id});   
        const {_id, __v, password, ...data} = await userData._doc;
        res.send(data);
    } catch (err) {
        res.status(400).send(err)
    }
});

router.post('/settings', authToken, async (req, res) => {

    if(!req.files || Object.keys(req.files).length === 0) return res.status(400).send({errorMessage: 'No file was uploaded'});
    
    const file = req.files.file;
    file.name = uuidv4() + file.name;
    

    file.mv(`${__dirname}/../../client/public/uploads/${file.name}`, async err => {
        if(err) {
            res.status(500).send(err);
        }

    const filePath = `uploads/${file.name}`;

    try {
         await User.findOneAndUpdate({_id: req.user.id}, {userAvatar: filePath}, async (err, result) => {
            if (err) return res.status(500).send(err);
                
            const {userAvatar} = await result;
            res.send(userAvatar);
        });
    } catch (err) {
        res.status(400).send(err);
     }

    });
});

router.post('/createRoom', authToken,  async (req, res) => {
    const { roomName, roomPassword } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassowrd = await bcrypt.hash(roomPassword, salt);

    const room = new Room({
        roomName,
        roomPassword: hashPassowrd,
        ownerId: req.user.id,
        users: []
    }); 
    try {
        const result = await room.save();
        const updatedRoom = await addUserToRoom(req.user.id, result._id);
        const {roomPassword, __v, _id, ...data} = await updatedRoom.toJSON();
        data.id = _id;
        res.status(201).send(data);
    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = router;