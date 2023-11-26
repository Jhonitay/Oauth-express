const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/OAuth')

router.get('/google', controller.loginGoogle)
router.get('/google/callback', controller.callbackLogin)

module.exports = router   
