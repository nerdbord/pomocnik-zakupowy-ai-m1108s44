import { convertToCoreMessages, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import axios from "axios";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";


import { MAIN_ASSISTANT_PROMPT } from "@/lib/Agents/prompts";
import { NextResponse } from "next/server";

const rateLimitPerMinute = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(15, "1 m"),
});

const rateLimitPerDay = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(60, "24 h"),
});

export const runtime = "edge";
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
  const ip = req.headers.get("x-forwarded-for");
  const { success: successPerMinute } = await rateLimitPerMinute.limit(
    `ratelimit_minute_${ip}`,
  );
  const { success: successPerDay } = await rateLimitPerDay.limit(
    `ratelimit_daily_${ip}`,
  );

  if (!successPerMinute) {
    return NextResponse.json(
      {
        message: "Too many requests per minute, please try again later.",
      },
      { status: 429 },
    );
  } else if (!successPerDay) {
    return NextResponse.json(
      {
        message: "Too many requests per day, please try again in 24 hours.",
      },
      { status: 429 },
    );
  }

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
