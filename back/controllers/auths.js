const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Pangolin = require('../models/Pangolin')

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new Pangolin({
                ...req.body,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur cree !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.statu(500).json({ error }));
}

exports.login = (req, res) => {
    console.log(req.body)
    Pangolin.findOne({ pseudo: req.body.pseudo })
        .then(user => {
            if (!user)
                return res.status(401).json({ error: 'Utilisateur non trouver !' });
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid)
                        return res.status(401).json({ error: 'Mot de passe incorrect !' })
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'cleDeDev',
                            { expiresIn: '24h' }
                        ),
                        Pangolin: user
                    })
                })
                .catch(error => res.statu(500).json({ error }))
        })
        .catch(error => res.statu(500).json({ error }));
}