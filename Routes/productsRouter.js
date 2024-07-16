const express = require('express');
const router = express.Router();
const { authMiddleware } = require("../middleware/auth")

router.get("/prod", authMiddleware, (req, res) => {
    res.status(200).json([
        {
            name: "macbook air",
            price: 20000,
        },
        {
            name: "iphone 13",
            price: 10000
        }
    ])
})

module.exports = router;

