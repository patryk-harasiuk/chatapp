const router = require('express').Router();
const User = require('../model/model');
const bcrypt = require('bcrypt');
const { registerValidation } = require('../validation/validation');

router.post('/register', async (req, res) => {
    const { username, password: plainTextPassword, email } = req.body;
    
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

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

module.exports = router;