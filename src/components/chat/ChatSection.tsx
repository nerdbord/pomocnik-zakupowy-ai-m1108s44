/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";
import { Message, ToolInvocation } from "ai";

import { ChatMessageItem } from "@/components/chat/ChatMessageItem";
import { ChatPopup } from "@/components/chat/ChatPopup";
import { useChatContext } from "@/context/ChatContext";
import { ChatError } from "@/components/chat/ChatError";
import { ChatForm } from "@/components/chat/ChatForm";
import { ChatResults } from "@/components/chat/results/ChatResults";

const INITIAL_MESSAGES: Message[] = [
  {
    id: "initial",
    role: "assistant",
    content: "Cześć, czego dzisiaj szukasz?",
    createdAt: new Date(),
  },
];

export const ChatSection = () => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(true);
  const { isNewChat, setNewChat } = useChatContext();
  const [isOfferShown, setIsOfferShown] = useState<boolean>(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    error,
    reload,
  } = useChat({
    keepLastMessageOnError: true,
    initialMessages: INITIAL_MESSAGES,
    onToolCall: () => {
      setIsOfferShown(true);
    },
  });

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, error]);

  useEffect(() => {
    if (isNewChat) {
      setMessages(INITIAL_MESSAGES);
      setNewChat(false);
      setIsOfferShown(false);
    }
  }, [isNewChat]);

  return (
    <section className="mx-auto flex h-full flex-col justify-between md:w-3/5">
      {isPopupVisible && <ChatPopup onClick={() => setIsPopupVisible(false)} />}
      <div />
      <div>
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              {!message.toolInvocations ? (
                <ChatMessageItem message={message} />
              ) : (
                message.toolInvocations?.map(
                  (toolInvocation: ToolInvocation) => {
                    return (
                      <ChatResults
                        key={`results-${toolInvocation.toolCallId}`}
                        toolInvocation={toolInvocation}
                        error={error}
                      />
                    );
                  },
                )
              )}
            </li>
          ))}
        </ul>
        {error && <ChatError error={error} reload={reload} />}
        <div ref={chatEndRef} />
        {!isOfferShown && !error && (
          <ChatForm
            onSubmit={handleSubmit}
            onInputChange={handleInputChange}
            input={input}
          />
        )}
      </div>
    </section>
  );
};
