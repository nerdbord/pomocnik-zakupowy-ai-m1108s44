/* eslint-disable react-hooks/exhaustive-deps */
import { ChatMessageItem } from "@/components/chat/ChatMessageItem";
import { ChatPopup } from "@/components/chat/ChatPopup";
import { ChatResultItem } from "@/components/chat/results/ChatResultItem";
import { ChatResultItemSkeleton } from "@/components/chat/results/ChatResultItemSkeleton";
import { Result } from "@/components/chat/types";
import { useChatStore } from "@/store/chatStore";
import { Message } from "ai";
import { useChat } from "ai/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export const ChatSection = () => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    chatHistories,
    currentChatId,
    addNewChat,
    updateMessages,
    updateResults,
  } = useChatStore();

  const currentChat = chatHistories.find((chat) => chat.id === currentChatId);

  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      initialMessages: currentChat?.messages || [
        {
          id: "initial",
          role: "assistant",
          content: "Hej, czego dzisiaj poszukujesz?",
        },
      ],
    });

  useEffect(() => {
    if (currentChatId) {
      updateMessages(currentChatId, messages);
    }
  }, [messages]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };
    const updatedMessages = [...messages, userMessage];

    if (currentChatId) {
      updateMessages(currentChatId, updatedMessages);
    } else {
      addNewChat();
    }

    await handleSubmit(e);
    setMessages(updatedMessages);
  };

  // Fetch and update results based on messages
  useEffect(() => {
    const getResults = async () => {
      if (
        !currentChat ||
        messages.length === 0 ||
        currentChat.results.length > 0
      )
        return;

      const lastMessage = messages[messages.length - 1].content;

      if (
        lastMessage.includes("Teraz szukam dla ciebie najlepszych propozycji!")
      ) {
        setIsLoading(true);
        const userQuery = lastMessage
          .replace("Teraz szukam dla ciebie najlepszych propozycji!", "")
          .trim();

        try {
          const tavilyResponse = await axios.post("/api/tavily", {
            userQuery,
          });
          const newResults: Result[] = tavilyResponse.data.answer;

          if (currentChatId) {
            updateResults(currentChatId, newResults);
          }

          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching results:", error);
          setIsLoading(false);
        }
      }
    };

    getResults();
  }, [messages, currentChatId]);

  useEffect(() => {
    if (currentChat) {
      setMessages(currentChat.messages);
    } else {
      addNewChat();
    }
  }, [currentChat]);

  return (
    <section className="mx-auto flex h-full flex-col justify-between md:w-3/5">
      {isPopupVisible && <ChatPopup onClick={() => setIsPopupVisible(false)} />}
      <div />
      <div>
        <ul>
          {currentChat?.messages.map((message) => (
            <ChatMessageItem key={message.id} message={message} />
          ))}
        </ul>

        {currentChat?.results && currentChat.results.length > 0 && (
          <ul className="mx-0 mt-8 flex flex-wrap items-stretch justify-around gap-4 lg:flex-row lg:items-stretch lg:justify-center">
            {currentChat.results.map((result) => (
              <ChatResultItem key={result.title} result={result} />
            ))}
          </ul>
        )}
        {isLoading && (
          <ul className="mx-0 mt-8 flex flex-col items-center justify-around gap-4 lg:flex-row lg:items-stretch lg:justify-center">
            <ChatResultItemSkeleton />
            <ChatResultItemSkeleton />
            <ChatResultItemSkeleton />
          </ul>
        )}

        <div ref={chatEndRef} />

        {!isLoading && (
          <>
            {currentChat?.results.length === 0 && (
              <form onSubmit={handleFormSubmit} className="mt-8 flex gap-2">
                <input
                  type="text"
                  placeholder="Np. nowego telefonu z dobrą pamiecią"
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
          </>
        )}
      </div>
    </section>
  );
};
