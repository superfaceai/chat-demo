const { inspect } = require('util');

const { getMessages, getDestinations, sendMessage, getServers } = require('./sf/usecases');

async function discord(destination) {
  const provider = 'discord';

  const servers = await getServers(provider, { asBot: true });
  // console.log(inspect(servers, true, 15));

  const destinations = await getDestinations(provider, { server: servers.servers[0].id });
  // console.log(inspect(destinations, true, 15));

  const channelId = destinations.destinations[0].id;
  const firstPage = await getMessages(provider, {
    destination: channelId,
    limit: 2,
  });

  console.log(inspect(firstPage, true, 15));

  // To use pagination with discord, 
  // you need to setup afterDate or beforeDate
  // based on direction you choose.

  // For pagination forwards, take nextPage from previous result
  // and set it up as beforeDate
  const nextPage = await getMessages(provider, {
    destination: channelId,
    beforeDate: firstPage.nextPage,
    limit: 2,
  })

  console.log(inspect(nextPage, true, 15))

  // For pagination backwards, take previousPage
  // and set it as afterDate
  const previousPage = await getMessages(provider, {
    destination: channelId,
    afterDate: nextPage.previousPage,
    limit: 2,
  })

  console.log(inspect(previousPage, true, 15))

  // const sentMessage = await sendMessage(provider, {
  //   destination,
  //   text: 'text message',
  // });
  // console.log(inspect(sentMessage, true, 15));
}

module.exports = discord;
