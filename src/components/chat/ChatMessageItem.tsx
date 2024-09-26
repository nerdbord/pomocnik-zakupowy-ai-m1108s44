/* eslint-disable @next/next/no-img-element */
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Message } from "ai";

export const ChatMessageItem = ({
  message: { role, content },
}: {
  message: Message;
}) => {
  const { user } = useUser();

  return (
    <div className={`chat ${role === "assistant" ? "chat-start" : "chat-end"}`}>
      <div className="avatar chat-image">
        <div className="w-10 rounded-full">
          <SignedIn>
            <img
              src={
                role === "user"
                  ? user?.imageUrl
                  : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
              alt="User avatar"
            />
          </SignedIn>
          <SignedOut>
            <img
              alt="AI avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </SignedOut>
        </div>
      </div>
      <div
        className={`${role === "assistant" ? "bg-color-gray" : "bg-color-primary-light"} chat-bubble`}
      >
        {content}
      </div>
    </div>
  );
};
