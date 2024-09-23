import { convertToCoreMessages, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import axios from "axios";

import { MAIN_ASSISTANT_PROMPT } from "@/lib/Agents/prompts";

export const maxDuration = 30;

const searchGoogle = async (query: string) => {
  try {
    console.log("[CHAT] Executing searchGoogle tool...");
    const results = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/tavily`,
      {
        query,
      },
    );

    return await results.data.answer;
  } catch (error) {
    console.error("Error from searchGoogle tool: ", error);

    return;
  }
};

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    system: MAIN_ASSISTANT_PROMPT,
    messages: convertToCoreMessages(messages),
    tools: {
      searchGoogle: {
        description: `Kiedy zdobędziesz wystarczającą ilość informacji o produkcie (w tym budżet użytkownika), jakiego user poszukuje wywołaj tę funkcję`,
        parameters: z.object({
          query: z
            .string()
            .describe(
              `podsumowanie informacji zebranych podczas konwersacji z użytkownikiem, query powinno zawierać budżet`,
            ),
        }),
        execute: async ({ query }) => {
          const results = await searchGoogle(query);

          return results;
        },
      },
    },
  });

  return result.toDataStreamResponse();
}
