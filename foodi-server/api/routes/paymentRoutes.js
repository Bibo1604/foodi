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

// get payment info
router.get('/', verifyToken, async (req, res) => {
    const email = req.query.email;
    const query = { email: email };
    try {
        const decodedEmail = req.decoded.email;
        if (email !== decodedEmail) {
            res.status(403).json({ message: "Forbidden Access!" });
        }
        const result = await Payments.find(query).sort({ createdAt: -1 }).exec();
        res.status(200).json(result);
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

// get all payments by users
router.get('/all', async (req, res) => {
    try {
        const payments = await Payments.find({}).sort({createdAt: -1}).exec();
        res.status(200).json(payments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

// confirm order status
router.patch('/:id', async (req, res) => {
    const paymentId = req.params.id;
    const {status} = req.body;
    try {
        const updatedStatus = await Payments.findByIdAndUpdate(paymentId, {status: "confirmed"}, {
            new: true,
            runValidators: true
        });

        if (!updatedStatus) {
            return res.status(404).json({message: "Order not found"});
        }
        res.status(200).json(updatedStatus);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

module.exports = router;