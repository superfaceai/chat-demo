const { inspect } = require('util');

function getAccessTokenByProviderName(providerName, req) {
  console.log(inspect(req.user, true, 3));

  switch (providerName) {
    case 'slack':
      return req.user.slack?.accessToken;
    case 'discord':
      return req.user.discord?.accessToken;
  }
}

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = {
  getAccessTokenByProviderName,
  ensureAuthenticated,
};
