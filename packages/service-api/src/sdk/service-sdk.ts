import { Logger } from 'src/utils/getLogger';

import { ChatCompletionResponse, PingResponse } from 'src/types';
import { HttpClient } from './http-client';

export type { ChatCompletionResponse, PingResponse };

export class ServiceSDK {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  chatCompletions = {
    create: async (prompt: string): Promise<ChatCompletionResponse> =>
      this.httpClient.post<ChatCompletionResponse>('/api/chat-completion', {
        prompt,
      }),
  };

  ping = {
    get: async (authContext: string): Promise<PingResponse> =>
      this.httpClient.get<PingResponse>('/api/ping', {
        headers: {
          Authorization: `Bearer ${authContext}`,
        },
      }),
  };
}

export const getServiceSDK = (baseURL: string, logger: Logger) => {
  const httpClient = new HttpClient(
    {
      baseURL,
    },
    logger,
  );
  return new ServiceSDK(httpClient);
};
