const DiscordStategy = require('passport-discord').Strategy;

module.exports = function () {
  return new DiscordStategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      scope: [
        'applications.builds.read',
        'identify',
        'bot',
        'messages.read',
        'guilds',
        'guilds.members.read',
      ],
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        return done(null, {
          displayName: profile.username,
          discord: { profile, accessToken, refreshToken },
        });
      });
    }
  );
};
