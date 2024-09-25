const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const { use } = require("../routes/userRoutes");
dotenv.config(); 

const   registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await userModel.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const userId = await userModel.createUser({ name, email, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully", userId });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users", error: error.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user by email
        const user = await userModel.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "invalid credential " });
        }

        // Compare provided password with hashed in database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;  // Extract userId from route parameters
        const user = await userModel.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user", error: error.message });
    }
};
// update user
const updateUser = async (req, res) => {
    try {
        const { userId } = req.params; // Get userId from route parameters
        const { name, email, password } = req.body; // Get updated fields from request body

        // Check if user exists
        const existingUser = await userModel.getUserById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: "User with this id is  not found" });
        }

        // Hash new password if it's provided
        // let updatedPassword = existingUser.password; // Default to existing password
        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }

        // Update the user in the database
        const updatedUser = await userModel.updateUser(userId, { name, email});
        res.json({ message: "User updated successfully", updatedUser }); 
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};

// delete user 

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params; // Make sure you are getting userId from params
        const user = await userModel.getUserById(userId)
        
        // Check if the delete was successful
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        } 
        
        const result = await userModel.deleteUserById(userId);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    } 
};

module.exports = {
    registerUser,
    getAllUsers,
    loginUser,
    getUserById, 
    updateUser,
     deleteUser
};
