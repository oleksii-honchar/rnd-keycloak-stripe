import { ChatCompletionApiFactory, PingApiFactory } from '@beaver/service-api';

import { getLogger } from 'src/utils/getLogger';

const logger = getLogger('text-completion-service');

const pingApi = PingApiFactory();
const chatCompletionApi = ChatCompletionApiFactory();

const say = async (prompt: string) => {
  logger.info(prompt);
  const result = await chatCompletionApi.apiChatCompletionPost({
    prompt,
  });
  return result.data.choices[0].message.content;
};

const ping = async () => {
  logger.info('ping');
  const result = await pingApi.apiPingGet();
  return result.data.message;
};

export const textCompletionService = {
  say,
  ping,
};
