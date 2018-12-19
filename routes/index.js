const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');


router.get('/', storeController.homePage);
router.get('/add', storeController.addStore);
router.post('/add', storeController.createStore);

module.exports = router;
















/* 

* req -> contains all the data
* res -> sends data back to the user



router.get('/reverse/:name', (req, res) => {
  const reverse = [...req.params.name].reverse().join(' ');
  res.send(reverse);
});

*/