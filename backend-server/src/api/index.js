/* route 모듈화 */
const express = require('express');
const router = express.Router();
const auth = require('./auth/index');

router.use('/auth', auth);

/* route export */
module.exports = router;
