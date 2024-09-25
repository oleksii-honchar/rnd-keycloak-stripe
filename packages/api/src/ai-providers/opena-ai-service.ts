import config from 'config';
import OpenAI from 'openai';

import { AiProvider, PromptOptions } from './types'; // Import PromptOptions

export class OpenAiService implements AiProvider {
  private openai: OpenAI;
  private defaultModel: string;

  constructor() {
    this.defaultModel = config.get('ai-providers.open-ai.default-model');
    this.openai = new OpenAI({
      apiKey: config.get('ai-providers.open-ai.apiKey'),
    });
  }

  async generateText(prompt: string, options?: PromptOptions): Promise<unknown> {
    const response = await this.openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: options?.model || this.defaultModel,
    });
    return response;
  }
}
