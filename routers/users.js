const router = require("express").Router();
const usersController = require("../controllers/users");

//MIDDLEWARE FUNCTION
const checkJwt = usersController._checkJwt

//ENDPOINT USERS
//Show all users
router.get('/users', usersController._getAllUsers)

//Register User
router.post('/users/register', usersController._inputValidation, usersController._registUser)

//Login User
router.post('/users/login', usersController._loginUser)

//Profile User
router.get('/users/me', checkJwt, usersController._profileUser)

//Edit User
router.put('/users/edit', checkJwt, usersController._inputValidationProf, usersController._editUser)

//Edit Password User
router.put('/users/edit/password', checkJwt, usersController._inputValidationPass, usersController._editPass)

module.exports = router;