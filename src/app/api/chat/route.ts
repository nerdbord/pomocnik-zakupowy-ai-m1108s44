import { convertToCoreMessages, streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const maxDuration = 30;

// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    system:
      "Jesteś asystentem zakupowym, który pomaga użytkownikowi znaleźć produkt na podstawie wywiadu. Zadajesz raczej krótkie pytania w zaleznosci czego dotyczy produkt dla przykladu: AI: Hej, czego dzisiaj potrzebujesz? User: Butow AI:Dla chlopca czy dziewczynki? USER: Dla chlopca AI: Jaki rozmiar? User: 45 AI:Czy masz preferencje co do firmy? User: Nie AI: A jaki masz budzet? User: 300zl.  W tym momencie ai powinno juz wiedziec dokladnie czego oczekuje user i zwrocic to w wiadomosci podsumowujacej czyli podsumowanie: buty dla chlopca rozmiar 42 do 300zl, w wiadomosci podsumowuwywujacej powinno sie znalezc na koncu `Teraz szukam dla ciebie najlepszych propozycji!` ",
    messages: convertToCoreMessages(messages),
  });
  console.log(result);
  return result.toDataStreamResponse();
  
  // try {
  //   const { userMessage, chatHistory, questionsAsked } = await req.json();

  //   const openAIResponse = await axios.post(
  //     "https://api.openai.com/v1/chat/completions",
  //     {
  //       model: "gpt-4o",
  //       messages: [
  //         {
  //           role: "system",
  //           content:
  //             "Jesteś asystentem zakupowym, który pomaga użytkownikowi znaleźć produkt na podstawie wywiadu. Zadajesz raczej krótkie pytania w zaleznosci czego dotyczy produkt dla przykladu: AI: Hej, czego dzisiaj potrzebujesz? User: Butow AI:Dla chlopca czy dziewczynki? USER: Dla chlopca AI: Jaki rozmiar? User: 45 AI:Czy masz preferencje co do firmy? User: Nie AI: A jaki masz budzet? User: 300zl.  W tym momencie ai powinno juz wiedziec dokladnie czego oczekuje user i zwrocic to w wiadomosci podsumowujacej czyli podsumowanie: buty dla chlopca rozmiar 42 do 300zl, w wiadomosci podsumowuwywujacej powinno sie znalezc na koncu `Teraz szukam dla ciebie najlepszych propozycji!` ",
  //         },
  //         {
  //           role: "user",
  //           content:
  //             chatHistory +
  //             `\nAI: ${questionsAsked === 0 ? "Hej, czego dzisiaj potrzebujesz?" : ""} User: ${userMessage}`,
  //         },
  //       ],
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${OPENAI_API_KEY}`,
  //       },
  //     },
  //   );

  //   const aiResult = openAIResponse.data.choices[0].message.content;
  //   return NextResponse.json({ answer: aiResult });
  // } catch (error) {
  //   console.error("Error:", error);
  //   return NextResponse.json(
  //     { error: "Something went wrong" },
  //     { status: 500 },
  //   );
  // }
}
