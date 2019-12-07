const router = require('express').Router();
const bcrypt = require('bcryptjs')

const Users = require('../users/users-model.js');

// /api/auth/register
router.post('/register', (req, res) => {
    let user = req.body
    console.log(user)
    const hash = bcrypt.hashSync(user.password, 8)
    user.password = hash

    Users.add(user)
        .then(newU => {
            res.status(201).json(newU)
        }).catch(err => {
            res.status(500).json(err)
        })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.isLoggedIn = true
                res.status(200).json({ message: `Welcome ${user.username}!` });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.delete('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(() => {
            if (err) {
                res.send('unable to logout...')
            } else {
                res.send('goodbye')
            }
        })
    } else {
        res.end()
    }
})


module.exports = router;
