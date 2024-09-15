import { Message } from "ai";

export interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
}

export interface Result {
  title: string;
  price: string;
  image: string;
  link: string;
}
