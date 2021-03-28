const router = require('express').Router();
const User = require('../model/model');
const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require('../validation/validation');

router.post('/register', async (req, res) => {
    const { username, password: plainTextPassword, email } = req.body;
    
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send({errorMessage: error.details[0].message, path: error.details[0].path[0]});

    const emailDuplicate = await User.findOne({email: email});
    if (emailDuplicate) return res.status(400).send({errorMessage: 'Email adress already exists', path: 'email'});

    const usernameDuplicate = await User.findOne({username: username});
    if (usernameDuplicate) return res.status(400).send({errorMessage: 'Username already exists', path: 'username'});

    const salt = await bcrypt.genSalt(10);
    const hashPassowrd = await bcrypt.hash(plainTextPassword, salt)

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

    const userExists = await User.findOne({email: email});
    if (!userExists) return res.status(400).send({errorMessage: 'Email is not found', path: 'email'});

    const validPassword = await bcrypt.compare(password, userExists.password);
    if (!validPassword) return res.status(400).send({errorMessage: 'Password is wrong', path: 'password'});

    res.send('Logged in!');
});

module.exports = router;