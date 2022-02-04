const sdk = require('./sdk');

const ALLOWED_PROVIDERS = new Set(['slack', 'discord']);

function checkAllowedProvider(provider) {
  if (!provider || !ALLOWED_PROVIDERS.has(provider)) {
    throw new Error(`Missing or unsupported provider "${provider}"`);
  }
}

async function getDestinations(providerName, input, accessToken) {
  const profile = await sdk.getProfile('chat/get-destinations');
  const provider = await sdk.getProvider(providerName);

  const result = await profile
    .getUseCase('GetDestinations')
    .perform(input, { provider, parameters: { accessToken } });

  return result.unwrap();
}

async function getMessages(providerName, input, accessToken) {
  const profile = await sdk.getProfile('chat/get-messages');
  const provider = await sdk.getProvider(providerName);

  const result = await profile
    .getUseCase('GetMessages')
    .perform(input, { provider, parameters: { accessToken } });

  return result.unwrap();
}

async function sendMessage(providerName, input, accessToken) {
  const profile = await sdk.getProfile('chat/send-message');
  const provider = await sdk.getProvider(providerName);

  const result = await profile
    .getUseCase('SendMessage')
    .perform(input, { provider, parameters: { accessToken } });

  return result.unwrap();
}

module.exports = {
  getDestinations,
  getMessages,
  sendMessage,
};
