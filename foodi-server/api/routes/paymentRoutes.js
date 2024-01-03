const express = require('express');
const mongoose = require('mongoose')
const Payments = require('../models/Payments');
const Carts = require('../models/Carts');
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();

// token
const verifyToken = require('../middleware/verifyToken');

// post payment information to db
router.post('/', verifyToken, async (req, res) => {
    const payment = req.body;
    try {
        const paymentRequest = await Payments.create(payment);
        // delete cart after payment
        const cartId = payment.cartItems.map(id => new ObjectId(id));
        const deletedCartRequest = await Carts.deleteMany({ _id: { $in: cartId } });
        res.status(200).json({ paymentRequest, deletedCartRequest });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

module.exports = router;