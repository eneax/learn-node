const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// Do work here
router.get('/', storeController.myMiddleware, storeController.homePage);

module.exports = router;
















/* 

* req -> contains all the data
* res -> sends data back to the user



router.get('/reverse/:name', (req, res) => {
  const reverse = [...req.params.name].reverse().join(' ');
  res.send(reverse);
});

*/