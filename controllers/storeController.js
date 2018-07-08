exports.homePage = (req, res) => {
  console.log(req.name);
  res.render('index'); // we render the index.pug template from the views directory
}












/*

exports.myMiddleware = (req, res, next) => {
  req.name = 'Wes';
  next(); // * once I'm done with 'myMiddleware', move to next task ('homePage')
}

*/ 