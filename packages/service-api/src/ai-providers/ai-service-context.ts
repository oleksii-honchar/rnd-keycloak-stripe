import { Logger } from 'src/utils/getLogger';
import { AnthropicService } from './antrhopic-service';
import { OpenAiService } from './opena-ai-service';
import { AI_PROVIDERS, AiProvider, AiProviderType, PromptOptions } from './types';

export class AiServiceContext {
  private provider: AiProvider;
  private providerInstances: { [key in AiProviderType]?: AiProvider } = {}; // Cache for provider instances
  private logger: Logger;

  constructor(providerType: AiProviderType, { logger }: { logger: Logger }) {
    this.logger = logger.child({ module: 'ai-service-context' });
    this.logger.info({ providerType }, 'initializing ai-service-context');

    this.provider = this.initiateProvider(providerType);
  }

  initiateProvider(providerType: AiProviderType): AiProvider {
    this.logger.info({ providerType: providerType }, 'initiating provider');

    if (!this.providerInstances[providerType]) {
      this.logger.info({ providerType: providerType }, 'creating new provider instance');
      switch (providerType) {
        case AI_PROVIDERS.OPEN_AI:
          this.providerInstances[providerType] = new OpenAiService({
            logger: this.logger,
          });
          break;
        case AI_PROVIDERS.ANTHROPIC:
          this.providerInstances[providerType] = new AnthropicService({
            logger: this.logger,
          });
          break;
        default:
          throw new Error(`Invalid provider type: ${providerType}`);
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
