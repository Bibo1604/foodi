const express = require('express');
const router = express.Router();

const Users = require('../models/Users');
const Menu = require('../models/Menu');
const Payments = require('../models/Payments');

const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

// get all orders
router.get('/', async (req, res) => {
    try {
        const result = await Payments.aggregate([
            {
                $unwind: '$menuItems'
            },
            {
                $lookup: {
                    from: 'menus',
                    localField: 'menuItems',
                    foreignField: '_id',
                    as: 'menuItemDetails',
                }
            },
            {
                $unwind: '$menuItemDetails'
            },
            {
                $group: {
                    _id: '$menuItemDetails.category',
                    quantity: {$sum: '$quantity'},
                    revenue: {$sum: '$price'}
                }
            },
            {
                $project: {
                    _id: 0,
                    category: '$_id',
                    quantity: '$quantity',
                    revenue:  '$revenue'
                }
            }
        ])

        res.json(result);
    } catch (error) {
        res.status(500).send("Internal Server Error: " + error.message)
    }
})

module.exports = router;