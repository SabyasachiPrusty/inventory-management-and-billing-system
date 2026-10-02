const express = require("express");
const router = express.Router();
const db = require("../db");

const verifyToken = require("../middleware/auth");

// Generate Bill
router.post("/bill", verifyToken, (req,res)=>{

const {product_id, quantity, price} = req.body;

const total = quantity * price;

// Save sale
db.query(
"INSERT INTO sales(product_id, quantity, total) VALUES(?,?,?)",
[product_id, quantity, total]
);

// Reduce stock
db.query(
"UPDATE products SET quantity = quantity - ? WHERE id=?",
[quantity, product_id]
);

res.json({message:"Bill Generated"});

});

// Get Sales
router.get("/", verifyToken, (req,res)=>{

db.query("SELECT * FROM sales",(err,result)=>{
res.json(result);
});

});

module.exports = router;