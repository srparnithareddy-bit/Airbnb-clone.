const express = require('express');
const router = express.Router();
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync');
const userController = require('../controllers/users');
const { saveRedirectUrl, isLoggedIn } = require('../middleware');

router
    .route('/signup')
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));

router
    .route('/login')
    .get(userController.renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate('local', {
            failureRedirect: '/login',
            failureFlash: true
        }),
        userController.login
    );

router.get('/logout', userController.logout);

router.get('/profile', isLoggedIn, wrapAsync(userController.profile));

module.exports = router;
