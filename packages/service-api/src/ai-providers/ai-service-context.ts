import { AnthropicService } from './antrhopic-service';
import { OpenAiService } from './opena-ai-service';
import { AI_PROVIDERS, AiProvider, AiProviderType, PromptOptions } from './types';

export class AiServiceContext {
  private provider: AiProvider;
  private providerInstances: { [key in AiProviderType]?: AiProvider } = {}; // Cache for provider instances

  constructor(providerType: AiProviderType) {
    this.provider = this.initiateProvider(providerType);
  }

  initiateProvider(providerType: AiProviderType): AiProvider {
    if (!this.providerInstances[providerType]) {
      switch (providerType) {
        case AI_PROVIDERS.OPENAI:
          this.providerInstances[providerType] = new OpenAiService();
          break;
        case AI_PROVIDERS.ANTHROPIC:
          this.providerInstances[providerType] = new AnthropicService();
          break;
      }
    }
    return this.providerInstances[providerType]!;
  }

  setActiveProvider(providerType: AiProviderType) {
    this.provider = this.initiateProvider(providerType);
  }

  async generateText(prompt: string, options?: PromptOptions): Promise<unknown> {
    return this.provider.generateText(prompt, options); // Pass options parameter
  }
}
