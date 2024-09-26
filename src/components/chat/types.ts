import { Message } from "ai";

export type Chat = {
  id: string;
  results: Result[];
  title: string;
  messages: Message[];
};

export type Result = {
  title: string;
  price: string;
  image: string;
  link: string;
};
