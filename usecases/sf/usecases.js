const client = require('./client');

async function getMessages(providerName, input) {
  const profile = await client.getProfile('chat/get-messages');
  const provider = await client.getProvider(providerName);

  const result = await profile
    .getUseCase('GetMessages')
    .perform(input, { provider });

  return result.unwrap();
}

async function getDestinations(providerName, input) {
  const profile = await client.getProfile('chat/get-destinations');
  const provider = await client.getProvider(providerName);

  const result = await profile
    .getUseCase('GetDestinations')
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

async function getServers(providerName, input) {
  const profile = await client.getProfile('chat/get-servers');
  const provider = await client.getProvider(providerName);

  const result = await profile
    .getUseCase('GetServers')
    .perform(input, { provider });

  return result.unwrap();
}

module.exports = {
    getMessages,
    getDestinations,
    sendMessage,
    getServers,
};
