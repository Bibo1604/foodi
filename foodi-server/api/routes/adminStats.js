const express = require('express');
const router = express.Router();

const Users = require('../models/Users');
const Menu = require('../models/Menu');
const Payments = require('../models/Payments');

const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

// get all orders, users, payments, menu items
router.get('/', async (req, res) => {
    try {
        const users = await Users.countDocuments();
        const menuItems = await Menu.countDocuments();
        const payments = await Payments.countDocuments();

        const result = await Payments.aggregate([{
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: '$price'
                }
            }
        }])
        const revenue = result.length > 0 ? result[0].totalRevenue : 0;

        res.status(200).json({
            users,
            menuItems,
            payments,
            revenue
        })

    } catch (error) {
        res.status(500).send("Internal Server Error: " + error.message);
    }
})

module.exports = router;