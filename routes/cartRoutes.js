const express = require('express');
const { authenticate } = require('../middleware/auth');
const cartController = require('../controllers/cartController');
const router = new express.Router();

router.post('/cart', authenticate, cartController.addToCart);
router.get('/cart', authenticate, cartController.getCart);

module.exports = router;
