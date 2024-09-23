import { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";
import { ToolInvocation } from "ai";

import { ChatMessageItem } from "@/components/chat/ChatMessageItem";
import { ChatPopup } from "@/components/chat/ChatPopup";
import { ChatResultItem } from "@/components/chat/results/ChatResultItem";
import { ChatResultItemSkeleton } from "@/components/chat/results/ChatResultItemSkeleton";
import { Result } from "@/components/chat/types";

export const ChatSection = () => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(true);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        id: "initial",
        role: "assistant",
        content: "Cześć, czego dzisiaj szukasz?",
        createdAt: new Date(),
      },
    ],
    onToolCall: (results) => console.log({ info: "toolCall", results }),
  });

  // Scroll to the latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
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
                      <div key={toolCallId}>
                        <ChatMessageItem
                          key={toolCallId}
                          message={{
                            id: "result",
                            role: "assistant",
                            content: "Znalazłem dla Ciebie następujące oferty:",
                          }}
                        />
                        <ul className="mx-0 mt-8 flex flex-wrap items-stretch justify-around gap-4 lg:flex-row lg:items-stretch lg:justify-center">
                          {toolInvocation.result.map((item: Result) => (
                            <ChatResultItem key={item.title} result={item} />
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <>
                        <ChatMessageItem
                          key={toolCallId}
                          message={{
                            id: "result",
                            role: "assistant",
                            content: `Szukam dla Ciebie: ${query}`,
                          }}
                        />
                        <ul className="mx-0 mt-8 flex flex-wrap items-stretch justify-around gap-4 lg:flex-row lg:items-stretch lg:justify-center">
                          <ChatResultItemSkeleton />
                          <ChatResultItemSkeleton />
                          <ChatResultItemSkeleton />
                        </ul>
                      </>
                    );
                  },
                )
              )}
            </li>
          ))}
        </ul>
        <div ref={chatEndRef} />

        <form onSubmit={handleSubmit} className="mt-8 flex gap-2">
          <input
            type="text"
            placeholder="Looking for something?"
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
            Send
          </button>
        </form>
      </div>
    </section>
  );
};
