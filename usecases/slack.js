const { inspect } = require('util');
const { getMessages, getDestinations, sendMessage } = require('./sf/usecases');

async function slack() {
  const provider = 'slack';

  const destinations = await getDestinations(provider, {
    types: ['public'],
  });
  // console.log(inspect(destinations, true, 15));

  const channelId = destinations.destinations[0].id
  const firstPage = await getMessages(provider, {
    destination: channelId,
    limit: 2,
  });

  console.log(inspect(firstPage, true, 15));

  // To use pagination with slack,
  // you need to setup page parameter.

  // For pagination forwards, take nextPage from previous result
  // and set it up as page.
  // For pagination backwards, you have to have cursor stored
  // from previous calls.
  const nextPage = await getMessages(provider, {
    destination: channelId,
    page: firstPage.nextPage,
    limit: 2,
  });

  console.log(inspect(nextPage, true, 15));

  // const sentMessage = await sendMessage(provider, {
  //   destination,
  //   text: 'text message',
  // });
  // console.log(inspect(sentMessage, true, 15));
}

module.exports = slack;
