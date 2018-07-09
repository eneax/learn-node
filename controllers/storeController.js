const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
  console.log(req.name);
  res.render('index'); // we render the index.pug template from the views directory
};

exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store'}); // we render 'editStore' template and pass the title 'Add Store'
};

exports.createStore = async (req, res) => {
  const store = new Store(req.body);
  await store.save(); // in order to sva 'store' in the database
  res.redirect('/'); // it happens after we are done with async, await, catch errors
};










/*

exports.myMiddleware = (req, res, next) => {
  req.name = 'Wes';
  next(); // * once I'm done with 'myMiddleware', move to next task ('homePage')
}

* req.body --> it will contain all the info that has been sent by the user

* await --> we don't move to the next line until we are done with the current one

*/ 