const router = require('express').Router();
const routerCtrl = require('./auth.ctrl');

router.post('/register', routerCtrl.register);
router.post('/login', routerCtrl.login);
router.get('/check', routerCtrl.check);
router.post('/logout', routerCtrl.logout);

module.exports = router;
