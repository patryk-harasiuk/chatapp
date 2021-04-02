require('dotenv').config();
const router = require('express').Router();
const User = require('../model/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation/validation');
const authToken = require('./verifyToken');

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
        const {password, ...data} = await result.toJSON();
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
        const {_id, password, ...data} = await userData;
        res.send(data._doc);
    } catch (err) {
        res.status(400).send(err)
    }
});

module.exports = router;