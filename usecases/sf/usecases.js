const client = require('./client');

async function perform(useCase, input, provider) {
  try {
    return (await useCase.perform(input, { provider })).unwrap();
  } catch (error) {
    throw new Error(
      `Perform failed: ${provider.configuration.name} - ${useCase.name}\n\nINPUT:\n${JSON.stringify(
        input
      )}\n\nOriginal Error: ${error.toString()}`
    );
  }
}

async function getConfiguration(profileName, providerName, useCaseName) {
  try {
    const profile = await client.getProfile(profileName);
    const provider = await client.getProvider(providerName);
    const useCase = profile.getUseCase(useCaseName);

    return {
      provider,
      useCase,
    };
  } catch (error) {
    throw new Error(
      `Getting SF components failed: ${profileName}/${providerName}/${useCaseName}\n\nOriginal Error: ${error.message}`
    );
  }
}

async function getChannels(providerName, input) {
  const { useCase, provider } = await getConfiguration(
    'chat/channels',
    providerName,
    'GetChannels'
  );

  return await perform(useCase, input, provider);
}

async function getMembers(providerName, input) {
  const { useCase, provider } = await getConfiguration(
    'chat/members',
    providerName,
    'GetMembers'
  );

  return await perform(useCase, input, provider);
}

async function getMessages(providerName, input) {
  const { useCase, provider } = await getConfiguration(
    'chat/messages',
    providerName,
    'GetMessages'
  );

  return await perform(useCase, input, provider);
}

async function getWorkspaces(providerName, input) {
  const { useCase, provider } = await getConfiguration(
    'chat/workspaces',
    providerName,
    'GetWorkspaces'
  );

  return await perform(useCase, input, provider);
}

async function getThreads(providerName, input) {
  const { useCase, provider } = await getConfiguration(
    'chat/threads',
    providerName,
    'GetThreads'
  );

  return await perform(useCase, input, provider);
}

async function sendMessage(providerName, input) {
  const { useCase, provider } = await getConfiguration(
    'chat/send-message',
    providerName,
    'SendMessage'
  );

  return await perform(useCase, input, provider);
}

module.exports = {
  getChannels,
  getMembers,
  getMessages,
  getWorkspaces,
  getThreads,
  sendMessage,
};
