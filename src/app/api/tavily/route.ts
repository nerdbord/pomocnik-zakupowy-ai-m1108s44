import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const TAVILY_API_KEY = process.env.TAVILY_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

interface TavilyResult {
  title: string;
  content: string;
  url: string;
}

interface TavilyResponse {
  images: string[];
  results: TavilyResult[];
}

export async function POST(req: NextRequest) {
  try {
    const { userQuery } = await req.json();

    const tavilyResponse = await axios.post<TavilyResponse>(
      "https://api.tavily.com/search",
      {
        api_key: TAVILY_API_KEY,
        query: `${userQuery} najniższa cena`,
        search_depth: "basic",
        include_answer: false,
        include_images: true,
        max_results: 20,
        include_domains: ["allegro.pl"],
      },
    );

    console.log(tavilyResponse.data);
    const searchResults = tavilyResponse.data.results;
    const formattedResults = searchResults
      .map((result) => {
        return `${result.title}: ${result.url}\nOpis: ${result.content}\nObraz: ${
          tavilyResponse.data.images || "brak obrazu"
        }\n\n`;
      })
      .join("");

    const openAIResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
            Jesteś asystentem zakupowym. Twoim zadaniem jest przetworzenie wyników wyszukiwania ze sklepu na poprawny JSON, gdzie pola "title" to tytuł produktu, "price" to cena (jeśli cena jest dostępna, wyodrębnij ją z opisu), "image" to link do obrazu produktu, a "link" to link do sklepu. 
            Ignoruj produkty, które nie mają ceny. Wybierz maksymalnie 3 produkty z najniższą ceną.
            Pamietaj ze cena powinna byc oznaczona na koncu waluta jak PLN
            JSON powinien zawierać tylko pola: "title", "price", "image", "link".
            Dla image wybierz zdjecie najpierw 1 pozniej 2 i na koncu 3 zeby zawsze byly rozne z tych ktore dostaniesz.
            `,
          },
          {
            role: "user",
            content: `Oto wyniki wyszukiwania: ${formattedResults}. Proszę, przeanalizuj dane i zwróć tylko prawidłowe wartości w formacie JSON. Nie zwracaj nic poza JSONEM!`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      },
    );

    const aiResult = openAIResponse.data.choices[0].message.content;

    return NextResponse.json({ answer: aiResult });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
