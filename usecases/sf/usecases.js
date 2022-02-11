const client = require('./client');

async function getChannels(providerName, input) {
  const profile = await client.getProfile('chat/channels');
  const provider = await client.getProvider(providerName);

  const result = await profile
    .getUseCase('GetChannels')
    .perform(input, { provider });

  return result.unwrap();
}

async function getMembers(providerName, input) {
  const profile = await client.getProfile('chat/members');
  const provider = await client.getProvider(providerName);

  const result = await profile
    .getUseCase('GetMembers')
    .perform(input, { provider });

  return result.unwrap();
}

async function getMessages(providerName, input) {
  const profile = await client.getProfile('chat/messages');
  const provider = await client.getProvider(providerName);

  const result = await profile
    .getUseCase('GetMessages')
    .perform(input, { provider });

  return result.unwrap();
}

async function getServers(providerName, input) {
  const profile = await client.getProfile('chat/servers');
  const provider = await client.getProvider(providerName);

  const result = await profile
    .getUseCase('GetServers')
    .perform(input, { provider });

  return result.unwrap();
}

async function getThreads(providerName, input) {
  const profile = await client.getProfile('chat/threads');
  const provider = await client.getProvider(providerName);

  const result = await profile
    .getUseCase('GetThreads')
    .perform(input, { provider });

  return result.unwrap();
}

async function sendMessage(providerName, input) {
  const profile = await client.getProfile('chat/send-message');
  const provider = await client.getProvider(providerName);

  const result = await profile
    .getUseCase('SendMessage')
    .perform(input, { provider });

  return result.unwrap();
}

module.exports = {
  getChannels,
  getMembers,
  getMessages,
  getServers,
  getThreads,
  sendMessage,
};
