import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Message } from "ai";
import { ChatHistory, Result } from "@/components/chat/types";

interface ChatState {
  chatHistories: ChatHistory[];
  currentChatId: string | null;
  setChatHistories: (histories: ChatHistory[]) => void;
  setCurrentChatId: (id: string | null) => void;
  addNewChat: () => void;
  updateMessages: (chatId: string, messages: Message[]) => void;
  updateResults: (chatId: string, results: Result[]) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      chatHistories: [],
      currentChatId: null,
      setChatHistories: (histories) => set({ chatHistories: histories }),
      setCurrentChatId: (id) => set({ currentChatId: id }),
      addNewChat: () =>
        set((state) => {
          const newChatId = Date.now().toString();

          const newChat: ChatHistory = {
            id: newChatId,
            title: "New Chat",
            messages: [
              {
                id: "initial",
                role: "assistant",
                content: "Hej, czego dzisiaj poszukujesz?",
              },
            ],
            results: [],
          };

          return {
            chatHistories: [...state.chatHistories, newChat],
            currentChatId: newChatId,
          };
        }),
      updateMessages: (chatId, messages) =>
        set((state) => ({
          chatHistories: state.chatHistories.map((history) =>
            history.id === chatId ? { ...history, messages } : history,
          ),
        })),
      updateResults: (chatId, results) =>
        set((state) => ({
          chatHistories: state.chatHistories.map((history) =>
            history.id === chatId ? { ...history, results } : history,
          ),
        })),
    }),
    {
      name: "chat-store",
    },
  ),
);
