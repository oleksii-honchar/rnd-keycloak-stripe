import { useState } from 'react';

import { textCompletionService } from 'services/text-completion-service';

import { TextCompletionInputForm } from './TextCompletionInputForm';
import { TextCompletionResponse } from './TextCompletionResponse';

export const TextCompletionContainer = () => {
  const { say } = textCompletionService;

  const [response, setResponse] = useState<string>('');

  const handleSay = async (prompt: string) => {
    const result = await say(prompt);
    setResponse(result);
  };

  return (
    <div
      className={`
      flex flex-row gap-2 bg-md-sys-light-surface-container-low p-4 rounded-lg
      w-2/3
    `}
    >
      <div className="flex flex-col gap-2 w-1/2">
        <TextCompletionInputForm onSubmit={handleSay} />
      </div>
      <div className="flex flex-col gap-2 w-1/2">
        <TextCompletionResponse response={response} />
      </div>
    </div>
  );
};
