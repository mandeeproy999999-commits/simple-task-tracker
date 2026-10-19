const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
};

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        
        const existing = await User.findOne({
            username: username.trim().toLowerCase()
        });

        if (existing) {
            return res.status(409).json({
                message: "Username already taken"
            });
        }

        
        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hashed
        });

        res.status(201).json({
            token: createToken(user._id),
            username: user.username
        });

    } catch (error) {
        
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Username already taken"
            });
        }

        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const user = await User.findOne({
            username: username.trim().toLowerCase()
        });

        
        const isMatch = user && await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        res.status(200).json({
            token: createToken(user._id),
            username: user.username
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { register, login };