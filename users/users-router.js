const router = require('express').Router();
const Users = require('./users-model.js');
const authReq = require('../auth/auth-middleware')

router.get('/', authReq, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

module.exports = router;
