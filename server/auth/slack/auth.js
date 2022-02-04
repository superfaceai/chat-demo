const SlackStategy = require('passport-slack-oauth2').Strategy;

module.exports = function () {
  return new SlackStategy(
    {
      clientID: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET,
      scope: [
        'identify',
        'reactions:read',
        'channels:read',
        'groups:read',
        'users:read',
        'channels:history',
        'groups:history',
        'mpim:history',
        'im:history',
      ],
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        return done(null, {
          displayName: profile.displayName,
          slack: { profile, accessToken, refreshToken },
        });
      });
    }
  );
};
