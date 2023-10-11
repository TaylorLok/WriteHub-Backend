const express = require('express');

const {createUser, getAllUsers, getUser, updateUser, deleteUser} = require('../controllers/userController');

const router = express.Router();

//get all users
router.get('/', getAllUsers);

//get a user
router.get('/:id', getUser);

//create a user
router.post('/', createUser);

//update a user
router.patch('/:id', updateUser);

//delete a user
router.delete('/:id', deleteUser);

//export the router
module.exports = router;
