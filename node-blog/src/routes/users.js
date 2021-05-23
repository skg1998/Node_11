const express = require('express');
const router = express.Router({ mergeParams: true });

const User = require('../model/User');

const { protect, authorize } = require('../middleware/hasAuth');
const advancedResult = require('../middleware/advancedResult');
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controller/users');

router.use(protect);
router.use(authorize('admin'))

router
    .route('/')
    .get(advancedResult(User), getUsers)
    .post(createUser)

router
    .route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router