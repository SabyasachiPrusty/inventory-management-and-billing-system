const express = require("express");
const router = express.Router();
const db = require("../db");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "inventory_secret_key";

router.post("/login", (req, res) => {

    const { username, password } = req.body;

    console.log("--- Login Attempt ---");
    console.log("Body received:", req.body); 

    db.query(
        "SELECT * FROM users WHERE username=?",
        [username],
        async (err, result) => {

            if (err) return res.status(500).json(err);

            if (result.length === 0) {
                return res.json({ success: false, message: "User not found" });
            }

            const user = result[0];

            //const validPassword = await bcrypt.compare(password, user.password);
            const validPassword = (password === user.password);

            if (!validPassword) {
            return res.json({ success: false, message: "Wrong password" });
            }

            const token = jwt.sign(
                { id: user.id, role: user.role },
                SECRET,
                { expiresIn: "8h" }
            );

            res.json({
                success: true,
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
            });

        }
    );
});

module.exports = router;