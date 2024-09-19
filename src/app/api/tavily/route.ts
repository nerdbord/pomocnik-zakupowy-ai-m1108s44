import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generateObject } from "ai";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";

const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

interface TavilyResult {
  title: string;
  content: string;
  url: string;
}

interface TavilyResponse {
  images: string[];
  results: TavilyResult[];
}


const POLISH_SYSTEM_PROMPT = `
        Jesteś asystentem zakupowym. Twoim zadaniem jest przetworzenie wyników wyszukiwania na poprawny JSON, gdzie pola "title" to tytuł produktu, "price" to cena (jeśli cena jest dostępna, wyodrębnij ją z opisu), "image" to link do obrazu produktu, a "link" to link do sklepu. 
        Ignoruj produkty, które nie mają ceny. Wybierz maksymalnie 3 produkty, które są najbliżej podanej przez użytkownika ceny, pomijając najtańsze produkty.
        Jeśli link do sklepu to będzie archiwum.allegro.pl to zignoruj i wybierz inne zamiast tego nawet jeśli pasuje pod opis.
        Jeśli w linku znajdziesz coś jak allegro.pl/listing? to też to zignoruj i wybierz inne.
        Upewnij się, że cena w JSON-ie zawiera jednostkę waluty PLN.
        JSON powinien zawierać tylko pola: "title", "price", "image", "link".
        Dla image wybierz zdjecie najpierw 1, potem 2, a na końcu 3, aby zawsze były różne z tych, które dostaniesz.`;

export async function POST(req: NextRequest) {
  try {

    const { userQuery, userBudget } = await req.json();

    const tavilyResponse = await axios.post<TavilyResponse>(
      "https://api.tavily.com/search",
      {
        api_key: TAVILY_API_KEY,
        query: `${userQuery} najniższa cena`,
        search_depth: "basic",
        include_answer: false,
        include_images: true,
        max_results: 20,
        include_domains: [""],
      },
    );

    const searchResults = tavilyResponse.data.results;
    const formattedResults = searchResults
      .map((result) => {
        return `${result.title}: ${result.url}\nOpis: ${result.content}\nObraz: ${
          tavilyResponse.data.images || "brak obrazu"
        }\n\n`;
      })
      .join("");



    const POLISH_PROMPT = `Oto wyniki wyszukiwania: ${formattedResults}.
        Użytkownik podał budżet ${userBudget} PLN. Proszę, przeanalizuj dane i zwróć tylko prawidłowe wartości w formacie JSON, wybierając produkty najbliżej tej ceny, ale pomijając najtańsze produkty.
        Nie zwracaj nic poza JSONEM!
      `;


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
      system: POLISH_SYSTEM_PROMPT,
      prompt: POLISH_PROMPT,
    });

    const aiResult = object.data;

    return NextResponse.json({ answer: aiResult });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
