import { Button } from '@headlessui/react';
import { useState } from 'react';
import { textCompletionService } from 'services/text-completion-service';

const { ping } = textCompletionService;

export const PingPong = () => {
  const [response, setResponse] = useState<string>('...');

  return (
    <div
      className={`
        flex flex-col bg-md-sys-light-surface-container-low p-4 rounded-lg w-2/3 gap-2
      `}
    >
      <div className="text-l">PingPong</div>
      <div className="flex flex-row gap-2">
        <Button
          className={`
          theme-button-primary w-20
        `}
          onClick={async () => {
            const result = await ping();
            setResponse(result);
          }}
        >
          Ping
        </Button>
        <div className="rounded-lg border p-2 bg-md-sys-light-surface-container-lowest w-full">
          {response}
        </div>
      </div>
    </div>
  );
};
