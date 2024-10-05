import { Button, Field, Label, Textarea } from '@headlessui/react';
import { useCallback, useState } from 'react';

import { nl } from 'utils/native-lodash';

interface TextCompletionInputFormProps {
  onSubmit: (message: string) => void;
}

export const TextCompletionInputForm = ({ onSubmit }: TextCompletionInputFormProps) => {
  const [message, setMessage] = useState('');

  const throttledSetMessage = useCallback(
    nl.throttle((value: string) => setMessage(value), 300),
    [],
  );

  return (
    <>
      <Field className="flex flex-col gap-2">
        <Label>One shot chat completion</Label>
        <Textarea
          name="description"
          className=" rounded-lg border data-[hover]:shadow p-2 h-20"
          onChange={e => {
            throttledSetMessage(e.target.value);
          }}
        />
      </Field>
      <Button
        className={`
          theme-button-primary
        `}
        onClick={() => {
          onSubmit(message);
        }}
      >
        Say
      </Button>
    </>
  );
};
