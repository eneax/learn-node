const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  const wes = {name: 'Wes', age: 100, cool: true};
  // res.send('Hey! It works!');
  // res.json(wes);
  // res.send(req.query.name);
  res.json(req.query);
});

router.get('/reverse/:name', (req, res) => {
  const reverse = [...req.params.name].reverse().join('');
  res.send(reverse);
});

module.exports = router;


/*
req --> it's an obj full of info that is coming in

res --> it's an obj full of methods that is sending data back to the user

next --> it's a middleware (it passes data to somebody else to handle)
*/ 