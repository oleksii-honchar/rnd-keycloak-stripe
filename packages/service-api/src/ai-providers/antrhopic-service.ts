import config from 'config';

import { Logger } from 'src/utils/getLogger';
import { AiProvider } from './types';

export class AnthropicService implements AiProvider {
  private defaultModel: string;
  private logger: Logger;

  constructor({ logger }: { logger: Logger }) {
    this.logger = logger.child({ module: 'anthropic-service' });
    this.defaultModel = config.get('ai-providers.anthropic.default-model');
    this.logger.info('initializing anthropic-service');

    // this.openai = new OpenAI({
    //   apiKey: config.get('ai-providers.open-ai.apiKey'),
    // });
  }

  async createChatComplition(prompt: string): Promise<string> {
    // Implement the other LLM provider API call here
    // Example:
    const response = await fetch('https://api.otherllm.com/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer YOUR_OTHERLLM_API_KEY`,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 100,
      }),
    });
    const data = await response.json();
    return data.result;
  }
}
