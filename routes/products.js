const express = require("express");
const router = express.Router();
const db = require("../db");

const verifyToken = require("../middleware/auth");
const checkRole = require("../middleware/role");

router.get("/",verifyToken,(req,res)=>{
db.query("SELECT * FROM products",(err,result)=>{
res.json(result);
});
});

router.post("/add",
verifyToken,
checkRole("admin"),
(req,res)=>{

const {name,price,quantity} = req.body;

db.query(
"INSERT INTO products(name,price,quantity) VALUES(?,?,?)",
[name,price,quantity],
(err)=>{
res.json({message:"Product Added"});
});

});

router.delete("/:id",
verifyToken,
checkRole("admin"),
(req,res)=>{

db.query(
"DELETE FROM products WHERE id=?",
[req.params.id],
()=>{
res.json({message:"Deleted"});
});

});

module.exports = router;