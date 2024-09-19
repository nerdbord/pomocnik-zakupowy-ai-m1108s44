export const PROMPT_PREPARE_GOOGLE_SEARCH_QUERY =
  "Generate best Google Search query in polish based on the provided input. Please be very concise.";

export const PROMPT_CHOOSE_BEST_RESULT =
  "Basing on the provided input choose the best product and return its only name or model and nothing else. Please return the name that will be able to search eBay API. Be very concise.";

export const PROMPT_CONVERT_SEARCH_FOR_EBAY = `Convert provided input into structured output. If the provided input contains the phrase "price to" return: "price:[priceForm..priceTo],priceCurrency:PLN". If the provided input not contains the phrase "from xx to xx" please try to correct price range independently, closer to the maximum price. Don't add anything else to the output. Always translate the query to English.
       Examples:

       Example 1:
       Input: {input}: Podsumowując szukasz laptopa do gier z dobrą kartą graficzną do 5000 zł. {bestProduct}: MSI Bravo 17 D7VFK-091XPL 
       Output: { query: 'msi+bravo', price: 'price:[4000..5000],priceCurrency:PLN'}

       Example 2:
       Input: {input}: Podsumowując szukasz roweru do trekkingu w przedziale cenowym od 2000 zł do 4000 zł. {bestProduct}: Kross Esker 2.0 Sora
       Output: { query: 'kross+esker', price: 'price:[2000..4000],priceCurrency:PLN}
  
       Example 3:
       Input: {input}: Podsumowując szukasz białej sukienki na jesień, długiej, z jedwabiu do 700 zł.
       Output: { query: 'long+white+dress+silk', price: 'price:[..700],priceCurrency:PLN}
       `;
