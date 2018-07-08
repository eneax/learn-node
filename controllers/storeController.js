exports.homePage = (req, res) => {
  console.log(req.name);
  res.render('index'); // we render the index.pug template from the views directory
}

exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store'}); // we render 'editStore' template and pass the title 'Add Store'
}

exports.createStore = (req, res) => {
  res.json(req.body)
}










/*

exports.myMiddleware = (req, res, next) => {
  req.name = 'Wes';
  next(); // * once I'm done with 'myMiddleware', move to next task ('homePage')
}

* req.body --> it will contain all the info that has been sent by the user

*/ 