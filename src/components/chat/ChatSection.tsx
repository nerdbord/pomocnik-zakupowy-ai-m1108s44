"use client";
import { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";
import { ToolInvocation } from "ai";

import { ChatMessageItem } from "@/components/chat/ChatMessageItem";
import { ChatPopup } from "@/components/chat/ChatPopup";
import { ChatResultItem } from "@/components/chat/results/ChatResultItem";
import { ChatResultItemSkeleton } from "@/components/chat/results/ChatResultItemSkeleton";
import { Result } from "@/components/chat/types";
import { useChatContext } from "@/app/context/ChatContext";

export const ChatSection = () => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(true);
  const { isNewChat, setNewChat } = useChatContext();
  const [isOfferShown, setIsOfferShown] = useState<boolean>(false);

  const [isSearching, setIsSearching] = useState<boolean>(false);

  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      initialMessages: [
        {
          id: "initial",
          role: "assistant",
          content: "Cześć, czego dzisiaj szukasz?",
          createdAt: new Date(),
        },
      ],
    });

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, isSearching]);

  useEffect(() => {
    if (isNewChat) {
      setMessages([
        {
          id: "initial",
          role: "assistant",
          content: "Cześć, czego dzisiaj szukasz?",
          createdAt: new Date(),
        },
      ]);
      setNewChat(false);
      setIsSearching(false);
    }
  }, [isNewChat, setMessages, setNewChat]);

  useEffect(() => {
    const hasPendingInvocation = messages.some((message) =>
      message.toolInvocations?.some(
        (toolInvocation: ToolInvocation) => !("result" in toolInvocation),
      ),
    );

    const hasCompletedInvocation = messages.some((message) =>
      message.toolInvocations?.some(
        (toolInvocation: ToolInvocation) => "result" in toolInvocation,
      ),
    );

    if (hasPendingInvocation) {
      setIsOfferShown(true);
      setIsSearching(true);
    } else if (hasCompletedInvocation) {
      setIsSearching(false);
    }
  }, [messages]);

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
                    const {
                      toolCallId,
                      args: { query },
                    } = toolInvocation;

                    return "result" in toolInvocation ? (
                      <div key={`results-${toolCallId}`}>
                        <ChatMessageItem
                          message={{
                            id: "result",
                            role: "assistant",
                            content: "Znalazłem dla Ciebie następujące oferty:",
                          }}
                        />
                        <ul className="mx-0 mt-8 flex flex-wrap items-stretch justify-around gap-4 lg:flex-row lg:items-stretch lg:justify-center">
                          {toolInvocation.result.map((item: Result) => (
                            <ChatResultItem key={item.link} result={item} />
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div key={`loadingresults-${toolCallId}`}>
                        <ChatMessageItem
                          message={{
                            id: "searching",
                            role: "assistant",
                            content: `Szukam dla Ciebie: ${query}`,
                          }}
                        />
                        <ul className="mx-0 mt-8 flex flex-wrap items-stretch justify-around gap-4 lg:flex-row lg:items-stretch lg:justify-center">
                          <ChatResultItemSkeleton />
                          <ChatResultItemSkeleton />
                          <ChatResultItemSkeleton />
                        </ul>
                      </div>
                    );
                  },
                )
              )}
            </li>
          ))}
        </ul>
        <div ref={chatEndRef} />

        {!isOfferShown && (
          <form onSubmit={handleSubmit} className="mt-8 flex gap-2">
            <input
              type="text"
              placeholder="Na przykład: 'Nowego laptopa do gier'"
              className="input mb-4 w-full bg-color-gray"
              value={input}
              onChange={handleInputChange}
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
        )}
      </div>
    </section>
  );
};
