import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generateObject } from "ai";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";

import { PROMPT_CHOOSE_BEST_FROM_GOOGLE_RESULTS } from "@/lib/chat/prompts";

const TAVILY_API_KEY = process.env.TAVILY_API_KEY;
const RESULTS_LIMIT = 20;

type TavilyResult = {
  title: string;
  content: string;
  url: string;
  raw_content: string;
};

type TavilyResponse = {
  images: string[];
  results: TavilyResult[];
};

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    console.log(
      `[TAVILY] Using Tavily to search Google by query: "${query}"...`,
    );

    const tavilyResponse = await axios.post<TavilyResponse>(
      "https://api.tavily.com/search",
      {
        api_key: TAVILY_API_KEY,
        query: `${query} sklep polska`,
        search_depth: "basic",
        include_answer: false,
        include_images: true,
        include_raw_content: false,
        max_results: RESULTS_LIMIT,
        include_domains: [""],
      },
    );

    const searchResults = tavilyResponse.data.results;
    console.log(
      `[TAVILY] Found ${searchResults.length}/${RESULTS_LIMIT} results in google.`,
    );

    const formattedResults = searchResults
      .map((result) => {
        return `${result.title}: ${result.url}\nOpis: ${result.content}\nObraz: ${
          tavilyResponse.data.images || "brak obrazu"
        }\n\n`;
      })
      .join("");

    console.log("[TAVILY] Converting Tavily results into structured object...");
    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: z.object({
        data: z
          .object({
            title: z.string(),
            price: z.string(),
            image: z.string(),
            link: z.string(),
          })
          .array(),
      }),
      system: PROMPT_CHOOSE_BEST_FROM_GOOGLE_RESULTS,
      prompt: `Oto wyniki wyszukiwania: ${formattedResults}.
    Spośród wyników wyszukiwania wybierz proszę wyniki, które najlepiej pasują do wyszukiwanego query: ${query}. Wyniki powinny zawierać nazwę produktu, informację o cenie, link do produktu w sklepie oraz link do obrazka. Wybieraj wyniki z polskich sklepów.`,
    });

    const aiResult = object.data;
    console.log("[TAVILY] Tavily results converted into structured object.");

    return NextResponse.json({ answer: aiResult });
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
