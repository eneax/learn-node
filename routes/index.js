const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// Do work here
router.get('/', storeController.homePage); // we use the homePage method that we created inside storeController

router.get('/reverse/:name', (req, res) => {
  const reverse = [...req.params.name].reverse().join('');
  res.send(reverse);
});

module.exports = router;


/*

* req --> it's an obj full of info that is coming in

* res --> it's an obj full of methods that is sending data back to the user

* next --> it's a middleware (it passes data to somebody else to handle)

res.render('name_of_template_to_render', 'some_local_variable')

* In order to get info to the pug template, we use local variables (locals) which pass an obj to 'render' 

router.get('/', (req, res) => {
  const wes = {name: 'Wes', age: 100, cool: true};
  res.send('Hey! It works!');
  res.json(wes);
  res.send(req.query.name);
  res.json(req.query);
  res.render('hello', {
    name: 'Wes',
    dog: req.query.dogName,
    title: 'I love food'
  });
});


*/ 