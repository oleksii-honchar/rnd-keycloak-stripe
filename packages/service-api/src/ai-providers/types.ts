type ObjectValues<T> = T[keyof T];

export const AI_PROVIDERS = {
  OPEN_AI: 'open-ai',
  ANTHROPIC: 'anthropic',
} as const;

export interface PromptOptions {
  model?: string;
}

export type AiProviderType = ObjectValues<typeof AI_PROVIDERS>;

export interface AiProvider {
  generateText(prompt: string, options?: PromptOptions): Promise<unknown>; // Added options parameter
}
