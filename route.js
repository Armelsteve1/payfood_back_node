const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('./src/authController/Authentification');

// Route d'inscription
router.post('/register', async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route de connexion
router.post('/login', async (req, res) => {
    try {
        const token = await loginUser(req.body);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

module.exports = router;
