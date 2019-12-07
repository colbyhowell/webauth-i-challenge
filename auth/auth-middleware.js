const users = require('../users/users-model.js');
const bcrypt = require('bcryptjs')

module.exports = (req, res, next) => {
    console.log(req.session)
    if (req.session.isLoggedIn) {
        next()
    } else {
        res.status(401).json({ message: 'Invalid Credentials' });
    }
}