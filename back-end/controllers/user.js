const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/user');
const { forwardAuthenticated } = require('../config/auth');

const controller = {
    register: async (req, res) => {
        const { name, email, password, password2 } = req.body;
        let errors = [];

        if (!name || !email || !password || !password2) {
            errors.push({ msg: 'Introduceti toate campurile' });
        }

        if (name.length < 6) {
            errors.push({ msg: 'Numele trebuie sa aiba minim 6 caractere' });
        }

        if (!email.includes("@") || !email.includes(".")) {
            errors.push({ msg: 'Formatul email-ului e invalid' });
        }

        if (password != password2) {
            errors.push({ msg: 'Parolele nu se potrivesc' });
        }

        if (password.length < 6) {
            errors.push({ msg: 'Parola trebuie sa aiba minim 6 caractere' });
        }

        if (errors.length > 0) {

            res.send(errors);
        } else {

            User.findOne({ where: { email: email } }).then(user => {
                if (user) {
                    errors.push({ msg: 'Email-ul e folosit deja' });

                    res.send({ msg: 'User-ul exista' });
                } else {
                    User.findOne({ where: { name: name } }).then(user => {
                        if (user) {
                            errors.push({ msg: 'Numele e folosit deja' });

                            res.send({ msg: 'User-ul exista' });
                        } else {
                            const newUser = new User({
                                name,
                                email,
                                password
                            });

                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(newUser.password, salt, (err, hash) => {
                                    if (err) throw err;
                                    newUser.password = hash;
                                    newUser
                                        .save()
                                        .then(user => {
                                            res.send({ msg: 'User-ul a fost creat' });
                                        })
                                        .catch(err => console.log(err));
                                });
                            });
                        }
                    })

                }
            });
        }
    },

    login: async (req, res) => {
        try {
            let user = await User.findOne({ where: { email: req.body.email } })
            let valid = await bcrypt.compare(req.body.password, user.password);

            if (valid) {
                res.send({ ok: true, id: user.id });
            } else {
                res.send({ ok: false, msg: 'Password/email doesnt match' });
            }
        }
        catch (err) {
            res.status(500).send(err);
        }
    },

    getUser: async (req, res) => {
        try {
            let user = await User.findOne({ where: { id: req.params.id } })
            
            if (user) {
                res.status(200).send(user);
            } else {
                res.send({ msg: 'Nu exista user-ul' });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    },
}

module.exports = controller;

// // Logout
// router.get('/logout', (req, res) => {
//     req.logout();
//     req.flash('success_msg', 'You are logged out');
//     res.redirect('/users/login');
// });