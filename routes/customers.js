// routes/customers.js

const express = require("express");
const router = express.Router();

// Import DB connection
const db = require("../db"); // make sure you have db.js

// ✅ Add Customer
router.post("/", (req, res) => {
    const { name, email, phone, address } = req.body;

    const sql = `
        INSERT INTO customers (name, email, phone, address)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [name, email, phone, address], (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({
            message: "Customer added successfully",
            id: result.insertId
        });
    });
});


// ✅ Get All Customers
router.get("/", (req, res) => {
    db.query("SELECT * FROM customers", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});


// ✅ Get Single Customer
router.get("/:id", (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM customers WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0]);
    });
});


// ✅ Update Customer
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;

    const sql = `
        UPDATE customers 
        SET name=?, email=?, phone=?, address=? 
        WHERE id=?
    `;

    db.query(sql, [name, email, phone, address, id], (err) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "Customer updated successfully" });
    });
});


// ✅ Delete Customer
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM customers WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "Customer deleted successfully" });
    });
});

module.exports = router;