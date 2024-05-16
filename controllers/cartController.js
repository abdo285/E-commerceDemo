const Cart = require('../models/cart');
const Product = require('../models/product');

// Add product to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, products: [] });
    }

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (productIndex > -1) {
      // Product already in cart, update quantity
      cart.products[productIndex].quantity += quantity;
    } else {
      // Add new product to cart
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('products.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
