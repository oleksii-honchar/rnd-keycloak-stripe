import { Field, Label } from '@headlessui/react';

export const TextCompletionResponse = ({ response }: { response: string }) => {
  return (
    <Field className="flex flex-col gap-2">
      <Label>Response</Label>
      <span className=" rounded-lg border p-2 bg-md-sys-light-surface-container-lowest h-20 overflow-y-auto">
        {response}
      </span>
    </Field>
  );
};
