const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  // res.send('Hey! It works!');
  res.send(req.query);
});

router.get('/reverse/:name', (req, res) => {
  const reverse = [...req.params.name].reverse().join(' ');
  res.send(reverse);
});

module.exports = router;



/* 
* req -> contains all the data
* res -> sends data back to the user
*/