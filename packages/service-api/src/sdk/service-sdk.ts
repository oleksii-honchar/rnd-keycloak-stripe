import { Logger } from 'src/utils/getLogger';

import { ChatCompletionResponse, PingResponse } from 'src/types';
import { HttpClient } from './http-client';

export type { ChatCompletionResponse, PingResponse };

export class ServiceSDK {
  constructor(private readonly httpClient: HttpClient) { }

  chatCompletions = {
    get: async (prompt: string): Promise<ChatCompletionResponse> =>
      this.httpClient.post<ChatCompletionResponse>('/api/chat-completion', {
        prompt,
      }),
  };

  ping = {
    get: async (): Promise<PingResponse> =>
      this.httpClient.get<PingResponse>('/api/ping'),
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