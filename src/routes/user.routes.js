const express = require('express');
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser
} = require('../controller/userController');

const router = express.Router();

router.route('/').get(getUsers)
                 .post(createUser)


router.route('/login').post(loginUser)
                
router.route('/:id').get(getUser)
                    .put(updateUser)
                    .delete(deleteUser)

module.exports = router