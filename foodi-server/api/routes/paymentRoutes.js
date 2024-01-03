const express = require('express');
const Payments = require('../models/Payments');
const router = express.Router();

// post payment information to db
router.post('/', async (req, res) => {
    const payment = req.body;
    try {
        const paymentRequest = await Payments.create(payment);
        res.status(200).json(paymentRequest);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

module.exports = router;