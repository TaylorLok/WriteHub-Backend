const User = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); //adding auth using javascript web token

//get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({createdAt: -1}); //sort by descending order
        res.status(200).json({message: 'All users'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

//get a user
const getUser = async (req, res) => {

    const id = req.params.id;

    //check if the id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Invalid id'});
    }

    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({message: 'No user with that id'});
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

//create a user
const createUser = async (req, res) => {
    const {username, password, email} = req.body;

    try {
        const newUser = await User.create({username, password, email});
        res.status(201).json({message: 'User created successfully'});
    } catch (err) {
        res.status(409).json({message: err.message});
    }
}

//update a user
const updateUser = async (req, res) => {
    const id = req.params.id;
    const {username, password, email} = req.body;

    //check if the id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Invalid id'});
    }

    try {
        const updatedUser = await User.findByIdAndUpdate({_id: id}, {username, password, email}, {new: true}); //mongoDB saves id = _id

        if(!updatedUser){
            return res.status(404).json({message: 'No user with that id'});
        }
        res.status(200).json({message: 'User updated successfully'});
    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

//delete a user
const deleteUser = async (req, res) => {
    const id = req.params.id;

    //check if the id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Invalid id'});
    }

    try {
        const deletedUser = await User.findByIdAndDelete({_id: id});

        if(!deletedUser){
            return res.status(404).json({message: 'No user with that id'});
        }
        res.status(200).json({message: 'User deleted successfully'});
    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

//add User registration
const registerUser = async (req, res) => {
    const { username, password, email } = req.body;
    console.log(req.body);
    try {
        // Check if the username or email is already in use
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already in use.' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new user
        const newUser = await User.create({ username, email, password: hashedPassword });
        console.log(newUser);
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};


// Login (Authenticate a user)
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by their username
        const user = await User.findOne({ username });

        // If the user doesn't exist or the password doesn't match, return an error
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create and send a JSON Web Token (JWT) for authentication
        const token = jwt.sign({ username: user.username }, 'your-secret-key', { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};


module.exports = {getAllUsers, getUser, registerUser, updateUser, deleteUser, loginUser, createUser}