const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/auth");

// Create Bill (Multiple Products)
router.post("/create", verifyToken, (req, res) => {

    const { customer_name, items } = req.body;
    // items = [{product_id, quantity, price}]

    let totalAmount = 0;

    items.forEach(item => {
        totalAmount += item.quantity * item.price;
    });

    // Insert Bill
    db.query(
        "INSERT INTO bills(customer_name,total) VALUES(?,?)",
        [customer_name, totalAmount],
        (err, result) => {

            if (err) return res.status(500).json(err);

            const billId = result.insertId;

            items.forEach(item => {

                // Insert bill items
                db.query(
                    "INSERT INTO bill_items(bill_id,product_id,quantity,price) VALUES(?,?,?,?)",
                    [billId, item.product_id, item.quantity, item.price]
                );

                // Reduce stock
                db.query(
                    "UPDATE products SET quantity = quantity - ? WHERE id=?",
                    [item.quantity, item.product_id]
                );

            });

            res.json({
                message: "Bill Created",
                bill_id: billId,
                total: totalAmount
            });

        }
    );

});

module.exports = router;