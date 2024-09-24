const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, message: "Invalid email or password." });
        }

        // Exclude password from response
        const { password: _, ...userData } = user.toObject();
        res.status(200).json({ success: true, user: userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred. Please try again." });
    }
}

const registerController = async (req, res) => {
    try {
        const { password, ...otherData } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ ...otherData, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ success: true, message: "New user created successfully!" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: "An error occurred. Please try again." });
    }
}

module.exports = { loginController, registerController };
