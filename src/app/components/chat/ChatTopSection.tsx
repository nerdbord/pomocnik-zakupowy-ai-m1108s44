import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export const ChatTopSection = ({
  startNewChat,
}: {
  startNewChat: () => void;
}) => {
  return (
    <section className="absolute right-6 top-6 basis-1/5 lg:static">
      <div className="sticky top-6 flex flex-col items-end gap-6">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <div className="btn">
            <SignInButton fallbackRedirectUrl="/" signUpFallbackRedirectUrl="/">
              Zaloguj się
            </SignInButton>
          </div>
        </SignedOut>
        <button
          className="btn btn-info flex items-center font-normal"
          onClick={startNewChat}
        >
          Rozpocznij nowy chat <span className="text-lg font-bold">+</span>
        </button>
      </div>
    </section>
  );
};
