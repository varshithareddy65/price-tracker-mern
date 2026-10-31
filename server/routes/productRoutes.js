
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Product = require('../models/Product');
const User = require('../models/User');

const scrapeProduct = require('../utils/scraper');
const authMiddleware = require('../middleware/authMiddleware');

// Validate product URL
const isValidProductUrl = (url) => {
  try {
    const parsedUrl = new URL(url);

    const hostname = parsedUrl.hostname.toLowerCase();

    return (
      ['http:', 'https:'].includes(parsedUrl.protocol) &&
      (
        hostname === 'amazon.in' ||
        hostname.endsWith('.amazon.in') ||
        hostname === 'amazon.com' ||
        hostname.endsWith('.amazon.com')
      )
    );
  } catch {
    return false;
  }
};

// Validate product input
const validateProduct = (title, url, targetPrice) => {
  if (!title || !url || targetPrice === undefined ||
    targetPrice === null || targetPrice === '') {
    return 'All product fields are required';
  }

  if (typeof title !== 'string' || !title.trim()) {
    return 'Invalid product title';
  }

  if (typeof url !== 'string' || !isValidProductUrl(url)) {
    return 'Please enter a valid Amazon product URL';
  }

  if (!Number.isFinite(Number(targetPrice)) ||
    Number(targetPrice) <= 0) {
    return 'Target price must be greater than zero';
  }

  return null;
};


// GET ALL PRODUCTS
router.get('/', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({
      userId: req.user.id
    });

    return res.status(200).json(products);

  } catch (error) {
    console.error('Fetch products error:', error.message);

    return res.status(500).json({
      message: 'Failed to fetch products'
    });
  }
});


// ADD PRODUCT
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { title, url, targetPrice } = req.body;

    const validationError = validateProduct(
      title, url, targetPrice
    );

    if (validationError) {
      return res.status(400).json({
        message: validationError
      });
    }

    // Get email from authenticated database user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({
        message: 'User not found'
      });
    }

    // Prevent duplicate products for the same user
    const existingProduct = await Product.findOne({
      userId: req.user.id,
      url: url.trim()
    });

    if (existingProduct) {
      return res.status(409).json({
        message: 'Product already exists'
      });
    }

    const scrapedData = await scrapeProduct(url.trim());

    if (
      !scrapedData ||
      !Number.isFinite(scrapedData.price) ||
      scrapedData.price <= 0
    ) {
      return res.status(400).json({
        message: 'Unable to retrieve a valid product price'
      });
    }

    const product = new Product({
      userId: req.user.id,
      title: title.trim(),
      email: user.email,
      url: url.trim(),
      image: scrapedData.image,
      currentPrice: scrapedData.price,
      targetPrice: Number(targetPrice),
      alertSent: false,
      priceHistory: [{
        price: scrapedData.price,
        date: new Date()
      }]
    });

    await product.save();

    return res.status(201).json(product);

  } catch (error) {
    console.error('Add product error:', error.message);

    return res.status(500).json({
      message: 'Failed to add product'
    });
  }
});


// UPDATE PRODUCT
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, url, targetPrice } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid product ID'
      });
    }

    const validationError = validateProduct(
      title, url, targetPrice
    );

    if (validationError) {
      return res.status(400).json({
        message: validationError
      });
    }

    // Find product belonging to logged-in user
    const product = await Product.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    product.title = title.trim();
    product.url = url.trim();
    product.targetPrice = Number(targetPrice);

    // Allow a fresh notification for the updated target
    product.alertSent = false;

    await product.save();

    return res.status(200).json(product);

  } catch (error) {
    console.error('Update product error:', error.message);

    return res.status(500).json({
      message: 'Failed to update product'
    });
  }
});


// DELETE PRODUCT
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid product ID'
      });
    }

    // Delete only if product belongs to logged-in user
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    return res.status(200).json({
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Delete product error:', error.message);

    return res.status(500).json({
      message: 'Failed to delete product'
    });
  }
});

module.exports = router;
