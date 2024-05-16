// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const { authenticate, authorize } = require('../middleware/auth');

// Public endpoints
router.get('/', authenticate, ProductController.getAll);
router.get('/:id', authenticate, ProductController.getById);

// Admin-only endpoints
router.post('/', authenticate, authorize('admin'), ProductController.create);
router.put('/:id', authenticate, authorize('admin'), ProductController.updateById);
router.delete('/:id', authenticate, authorize('admin'), ProductController.deleteById);

module.exports = router;
