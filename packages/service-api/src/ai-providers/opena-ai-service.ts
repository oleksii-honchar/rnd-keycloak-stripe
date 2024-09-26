import config from 'config';
import OpenAI from 'openai';

import { Logger } from 'src/utils/getLogger';
import { AiProvider, PromptOptions } from './types'; // Import PromptOptions

export class OpenAiService implements AiProvider {
  private openai: OpenAI;
  private defaultModel: string;
  private logger: Logger;

  constructor({ logger }: { logger: Logger }) {
    this.logger = logger.child({ module: 'openai-service' });
    this.defaultModel = config.get('ai-providers.open-ai.default-model');
    this.logger.info('initializing open-ai-service');

    this.openai = new OpenAI({
      apiKey: config.get('ai-providers.open-ai.apiKey'),
    });
  }

  async generateText(prompt: string, options?: PromptOptions): Promise<unknown> {
    this.logger.info({ prompt, options }, 'generating text');

    const response = await this.openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: options?.model || this.defaultModel,
    });
    return response;
  }
}
