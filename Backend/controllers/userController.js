const User = require('../models/userModel');
const mongoose = require('mongoose');

//get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({createdAt: -1});
        res.status(200).json(users);
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

module.exports = {getAllUsers, getUser, createUser, updateUser, deleteUser}