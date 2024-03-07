const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('./src/authController/Authentification');
const restaurantController = require('./src/restaurantController/restaurantController');


router.post('/register', async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const token = await loginUser(req.body);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});


router.get('/restaurants', restaurantController.getAllRestaurants);

router.get('/restaurants/:id', restaurantController.getRestaurantById);

router.post('/restaurants', restaurantController.createRestaurant);

router.put('/restaurants/:id', restaurantController.updateRestaurant);

router.delete('/restaurants/:id', restaurantController.deleteRestaurant);

module.exports = router;
