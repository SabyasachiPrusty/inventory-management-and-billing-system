const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/auth");

// Get Invoice Details
router.get("/:id", verifyToken, (req, res) => {

    const billId = req.params.id;

    // Get Bill Info
    db.query(
        "SELECT * FROM bills WHERE id=?",
        [billId],
        (err, billResult) => {

            if (err) return res.status(500).json(err);
            if (billResult.length === 0)
                return res.status(404).json({ message: "Bill not found" });

            const bill = billResult[0];

            // Get Items with product names
            db.query(
                `SELECT bi.*, p.name 
                 FROM bill_items bi
                 JOIN products p ON bi.product_id = p.id
                 WHERE bi.bill_id=?`,
                [billId],
                (err, itemsResult) => {

                    if (err) return res.status(500).json(err);

                    res.json({
                        bill,
                        items: itemsResult
                    });

                }
            );

        }
    );

});

module.exports = router;