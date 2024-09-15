import { UserButton } from "@clerk/nextjs";

export const ChatTopSection = ({
  startNewChat,
}: {
  startNewChat: () => void;
}) => {
  return (
    <section className="absolute right-6 top-6 flex basis-1/5 items-start gap-6 lg:static">
      <button
        className="btn btn-info flex items-center font-normal"
        onClick={startNewChat}
      >
        Start new chat <span className="text-lg font-bold">+</span>
      </button>
      <UserButton />
    </section>
  );
};
