const passport = require('passport'); // needed in order to log everybody in

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out!');
  res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    next(); // Carry on! They are logged in!
    return;
  }
  req.flash('error', 'Oops! You must be logged in!');
  res.redirect('/login');
};