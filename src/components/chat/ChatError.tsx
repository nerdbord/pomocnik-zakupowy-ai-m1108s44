type ChatErrorProps = {
  error: Error;
  reload: () => void;
};

export const ChatError = ({ error, reload }: ChatErrorProps) => {
  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center text-red-500">
      {error.message.includes("Too many requests per minute") ? (
        <>
          <div>
            Wykorzystałeś limit zapytań na minutę. Spróbuj ponownie za minutę.
          </div>
          <button
            type="button"
            className="btn text-color-black"
            onClick={() => reload()}
          >
            Ponów
          </button>
        </>
      ) : error.message.includes("Too many requests per day") ? (
        <>
          <div>Wykorzystałeś swój dzienny limit. Spróbuj ponownie za 24h.</div>
        </>
      ) : (
        <>
          <div>Wystąpił nieoczekiwany problem. Spróbuj jeszcze raz</div>
          <button
            type="button"
            className="btn text-color-black"
            onClick={() => reload()}
          >
            Ponów
          </button>
        </>
      )}
    </div>
  );
};
