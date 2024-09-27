import { ChangeEvent } from "react";

type ChatFormProps = {
  onSubmit: () => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  input: string;
};

export const ChatForm = ({ onSubmit, onInputChange, input }: ChatFormProps) => {
  return (
    <form onSubmit={onSubmit} className="mt-8 flex gap-2">
      <input
        type="text"
        placeholder="Na przykład: 'Nowego laptopa do gier'"
        className="input mb-4 w-full bg-color-gray"
        value={input}
        onChange={onInputChange}
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!input.length}
        aria-disabled={!input.length}
      >
        Wyślij
      </button>
    </form>
  );
};
