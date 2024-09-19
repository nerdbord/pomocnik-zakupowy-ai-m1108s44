export const HamburgerButton = ({
  onClick,
  className,
}: Readonly<{ onClick: () => void; className?: string }>) => {
  return (
    <button
      onClick={onClick}
      className={`${className}`}
      aria-label="Toggle navigation"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-8 w-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
};
