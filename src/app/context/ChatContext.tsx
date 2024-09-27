"use client";
import React, { createContext, useContext, useState } from "react";

interface ChatContextType {
  isNewChat: boolean;
  setNewChat: (value: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [isNewChat, setNewChat] = useState<boolean>(false); 

  return (
    <ChatContext.Provider value={{ isNewChat, setNewChat }}>
      {children}
    </ChatContext.Provider>
  );
};


export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
