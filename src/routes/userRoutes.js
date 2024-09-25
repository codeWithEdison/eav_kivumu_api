const express = require('express');
const { validateRegister } = require("../middleware/validation");
const { registerUser, getAllUsers, loginUser, getUserById, updateUser, deleteUser } = require("../controllers/userControllers"); 


const route = express.Router();

// Register route
route.post('/register', validateRegister, registerUser, getUserById); 

// Get all users
route.get('/', getAllUsers);

// Login route
route.post('/login', loginUser); 
// get user by id
route.get('/:userId', getUserById); 

// update user 
route.put('/update/:userId', updateUser);
// deleet user
route.delete('/:userId', deleteUser)

module.exports = route;
