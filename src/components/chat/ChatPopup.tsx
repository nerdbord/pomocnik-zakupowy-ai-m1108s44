import Link from "next/link";

export const ChatPopup = ({ onClick }: Readonly<{ onClick: () => void }>) => {
  return (
    <div role="alert" className="alert alert-info">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="h-6 w-6 shrink-0 stroke-color-black"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <div>
        <h3 className="text-md">
          Zyskaj dostęp do spersonalizowanych sugestii
        </h3>
        <p className="text-sm text-color-dark-light">
          Przejdź na plan premium, aby otrzymywać rekomendacje zakupowe
          dopasowane do Twoich nawyków i preferencji
        </p>
      </div>
      <div>
        <button className="btn-sm" onClick={onClick}>
          Nie, dziękuję
        </button>
        <Link href="/" className="btn btn-primary btn-sm">
          Zmień plan
        </Link>
      </div>
    </div>
  );
};
