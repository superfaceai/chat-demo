const { getMessages, getDestinations } = require('./sf/use-cases');
const { getAccessTokenByProviderName } = require('./utils');

module.exports = async function getMessagesRoute(req, res, next) {
  let { provider, destination, page } = req.query;

  if (!provider) {
    provider = 'slack';
  }

  let destinations;

  try {
    const accessToken = getAccessTokenByProviderName(provider, req);

    if (!accessToken) {
      res.render('messages', {
        user: req.user,
        provider,
        success: false,
        destinations,
        error: {
          title: 'User not logged in for selected provider',
        },
      });

      return;
    }

    if (!destination) {
      ({ destinations } = await getDestinations(
        provider,
        {
          page,
          types: ['public', 'private'],
        },
        accessToken
      ));
    }

    let result;
    if (!destinations) {
      result = await getMessages(
        provider,
        {
          destination,
          page,
        },
        accessToken
      );
    }

    res.render('messages', {
      user: req.user,
      provider,
      success: true,
      destinations,
      result,
    });
  } catch (error) {
    console.error(error);

    res.render('messages', {
      user: req.user,
      provider,
      success: false,
      destinations,
      error: {
        title: error.properties?.title ?? error.message,
        detail: error.properties?.detail,
      },
    });
  }
};
