const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/add', storeController.addStore);
router.post('/add', catchErrors(storeController.createStore));

module.exports = router;














/*

* catchErrors --> we use this handle error function, instead of 'try'...'catch'

we use the homePage method that we created inside storeController

* req --> it's an obj full of info that is coming in

* res --> it's an obj full of methods that is sending data back to the user

* next --> it's a middleware (it passes data to somebody else to handle...it's always after 'req' and before 'res')

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

router.get('/reverse/:name', (req, res) => {
  const reverse = [...req.params.name].reverse().join('');
  res.send(reverse);
});


*/ 