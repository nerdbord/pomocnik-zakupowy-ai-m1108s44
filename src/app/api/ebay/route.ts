import { NextRequest, NextResponse } from "next/server";
import fetchEbayProducts from "@/lib/ebay/ebayService";
import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import axios from "axios";

import {
  PROMPT_CHOOSE_BEST_RESULT,
  PROMPT_CONVERT_SEARCH_FOR_EBAY,
  PROMPT_PREPARE_GOOGLE_SEARCH_QUERY,
} from "./../../../lib/Agents/prompts";

const ConvertedInput = z.object({
  query: z.string(),
  price: z.string(),
});

const CategoryClassification = z.object({
  category: z.enum(["fashion", "electronics", "automotive", "other"]),
  explanation: z.string(),
});

const classifyCategory = async (
  userQuery: string,
): Promise<z.infer<typeof CategoryClassification>> => {
  const { object: classification } = await generateObject({
    model: openai("gpt-4o"),
    schema: CategoryClassification,
    system:
      "Classify the user query into one of these categories: fashion, electronics, or other. Provide a very short and concise brief explanation for your classification.",
    prompt: `User query: ${userQuery}`,
  });

  console.log("Category classification:", classification);
  return classification;
};

const prepareGoogleSearchQuery = async (userQuery: string): Promise<string> => {
  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: PROMPT_PREPARE_GOOGLE_SEARCH_QUERY,
    prompt: `input: ${userQuery}`,
  });

  console.log("Generated Google Search query:", text.toString());
  return text;
};

const getResultsFromGoogle = async (
  googleSearchText: string,
): Promise<string[]> => {
  const tavilyResponse = await axios.post("http://localhost:3000/api/tavily", {
    userQuery: googleSearchText,
  });
  return tavilyResponse.data.answer;
};

const getBestResult = async (resultsFromGoogle: string[]): Promise<string> => {
  const { text: bestProduct } = await generateText({
    model: openai("gpt-4o"),
    system: PROMPT_CHOOSE_BEST_RESULT,
    prompt: `google results: ${resultsFromGoogle}`,
  });

  console.log("Best product:", bestProduct);
  return bestProduct;
};

const convertInput = async (input: string) => {
  const { object: convertedInput } = await generateObject({
    model: openai("gpt-4o"),
    schema: ConvertedInput,
    system: PROMPT_CONVERT_SEARCH_FOR_EBAY,
    prompt: input,
  });

  console.log("Converted eBay input:", convertedInput);
  return convertedInput;
};

export async function POST(req: NextRequest) {
  const { userQuery } = await req.json();

  if (!userQuery) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 },
    );
  }

  try {
    const { category } = await classifyCategory(userQuery);

    let query: string, price: string;

    if (category === "fashion") {
      ({ query, price } = await convertInput(`input: ${userQuery}`));
    } else {
      const googleSearchQuery = await prepareGoogleSearchQuery(userQuery);
      const resultsFromGoogle = await getResultsFromGoogle(googleSearchQuery);
      const bestProduct = await getBestResult(resultsFromGoogle);
      ({ query, price } = await convertInput(
        `input: ${userQuery}. bestProduct: ${bestProduct}`,
      ));
    }

    const products = await fetchEbayProducts(query, price);
    return NextResponse.json({ products, category });
  } catch (error) {
    console.error("Error in eBay search route:", error);
    return NextResponse.json(
      { error: "Failed to process request or fetch products from eBay" },
      { status: 500 },
    );
  }
}


