const { inspect } = require('util');

const {
  getChannels,
  getMembers,
  getMessages,
  getServers,
  getThreads,
  sendMessage,
} = require('./sf/usecases');

async function discord(destination) {
  const provider = 'discord';

  const servers = await getServers(provider, { asBot: true });
  // console.log(inspect(servers, true, 15));

  const serverId = servers.servers[0].id;
  const channels = await getChannels(provider, { server: serverId });
  // console.log(inspect(channels, true, 15));

  const channelId = channels.channels[0].id;
  const firstPage = await getMessages(provider, {
    destination: channelId,
    limit: 2,
  });

  console.log(inspect(firstPage, true, 15));

  // To use pagination with discord,
  // you need to setup parameter page. (similar to slack)

  // For pagination forwards, take nextPage from previous result
  // and set it up as page.
  // For pagination backwards, you have to have cursor stored
  // from previous calls.
  if (firstPage.nextPage !== undefined) {
    const nextPage = await getMessages(provider, {
      destination: channelId,
      page: firstPage.nextPage,
      limit: 2,
    });

    console.log(inspect(nextPage, true, 15));
  }

  // SendMessage
  // const sentMessage = await sendMessage(provider, {
  //   destination,
  //   text: 'text message',
  // });
  // console.log(inspect(sentMessage, true, 15));

  // new usecases:
  // GetMembers - also supports pagination, in same manner as described above

  const members = await getMembers(provider, {
    server: serverId,
    limit: 2,
  });

  console.log(inspect(members, true, 15));

  // GetThreads - this pulls currently active threads
  // this usecase does not support pagination as well as in
  // discord map for getting channels, they return them all in one request
  const threads = await getThreads(provider, {
    server: serverId,
    limit: 2,
  });

  console.log(inspect(threads, true, 15));
}

module.exports = discord;
