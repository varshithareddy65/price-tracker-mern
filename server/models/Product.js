const mongoose = require('mongoose');

const productSchema =
  new mongoose.Schema({

    title: String,

    userId: String,

    email: String,

    url: String,
    image: String,

    currentPrice: Number,

    targetPrice: Number,

    // EMAIL ALERT STATUS
    alertSent: {

      type: Boolean,

      default: false

    },

    // PRICE HISTORY
    priceHistory: [

      {

        price: Number,

        date: {

          type: Date,

          default: Date.now

        }

      }

    ],

    createdAt: {

      type: Date,

      default: Date.now

    }

  });

module.exports =
  mongoose.model(
    'Product',
    productSchema
  );