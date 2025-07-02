const authenticateUser = require('../Controller/User/Authenticate');
const handleLogin = require('../Controller/User/Login');
const logout = require('../Controller/User/Logout');
const handleRegister = require('../Controller/User/Register');
const fieldError = require('../Utility/FieldsError');
const validateUserFields = require('../Utility/FieldValidation');
const { verifyToken } = require('../Utility/JWT');

const router = require('express').Router();




// register route
router.post("/register", validateUserFields(['name','email','password','username']),fieldError,handleRegister);
router.post("/login",validateUserFields(['email','password']),fieldError,handleLogin)
router.get("/authenticate",verifyToken,authenticateUser)
router.get('/logout',verifyToken,logout)


module.exports = router;