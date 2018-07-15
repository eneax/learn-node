const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
  res.render('index'); // we render the index.pug template from the views directory
};

exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store'}); // we render 'editStore' template and pass the title 'Add Store'
};

exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save();
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
  res.redirect(`/store/${store.slug}`); // it happens after we are done with async, await, catch errors
};

exports.getStores = async (req, res) => {
  // 1. Query the db for a list of all stores
  const stores = await Store.find();
  res.render('stores', {title: 'Stores', stores: stores});
}

exports.editStore = async (req, res) => {
  //1. Find the store given the id
  const store = await Store.findOne({ _id: req.params.id});
  //TODO 2. Confirm they are the owner of the store
  //3. Render out the edit form, so the user can update their store
  res.render('editStore', { title: `Edit ${store.name}`,  store: store });
}

exports.updateStore = async (req, res) => {
  // set the location data to be a point
  req.body.location.type = 'Point';
  // find and update the store
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new store instead of the new one 
    runValidators: true
  }).exec();
  req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store →</a>`);
  // Redirect them to the store and tell them that it worked
  res.redirect(`/stores/${store._id}/edit`);
}





/*

exports.myMiddleware = (req, res, next) => {
  req.name = 'Wes';
  next(); // * once I'm done with 'myMiddleware', move to next task ('homePage')
}

* req.body --> it will contain all the info that has been sent by the user

* async --> every time you have to deal with the db, it's better to use async

* await --> we don't move to the next line until we are done with the current one

* flash() --> it takes 2 things: type of flash (success, error, warning, info) and message to display

*/ 