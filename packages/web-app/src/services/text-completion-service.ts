import { getServiceSDK } from '@beaver/service-api/dist/src/sdk/index';
import type { PingResponse } from '@beaver/service-api/dist/src/sdk/service-sdk.d.ts';

import { getLogger } from 'src/utils/getLogger';

const logger = getLogger('text-completion-service');

const serviceSDK = getServiceSDK(process.env.SERVICE_API_URL as string, logger);

const say = async (prompt: string) => {
  logger.info(prompt);
  const result = await serviceSDK.chatCompletions.get(prompt);
  return result?.choices[0]?.message.content;
};

const ping = async () => {
  logger.info('ping');
  const result: PingResponse = await serviceSDK.ping.get();
  return result.message;
};

export const textCompletionService = {
  say,
  ping,
};
