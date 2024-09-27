const fetchEbayProducts = async (
  query: string | number | boolean,
  filter: string,
) => {
  const endpoint = "https://api.ebay.com/buy/browse/v1/item_summary/search"; 
  const apiKey = process.env.EBAY_TOKEN;
  console.log(`Searching ${query} in Ebay API by filter ${filter}`);
  const url = `${endpoint}?q=${encodeURIComponent(query)}&limit=3&filter=${filter}`; 
  console.log("URL FROM EBAYSERVICE: ", url);

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "Accept-Language": "pl-PL",
    "X-EBAY-C-MARKETPLACE-ID": "EBAY_PL",
  };

  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error("Failed to fetch products from eBay");
    }

    const data = await response.json();

    console.log("Found items: ", data);

    const products = data.itemSummaries.map((item: { title: string; price: { value: number; currency: number; }; itemWebUrl: string; image: { imageUrl: string; }; }) => ({
      title: item.title,
      price: item.price.value,
      currency: item.price.currency,
      link: item.itemWebUrl,
      image: item.image.imageUrl,
    }));

    return products;
  } catch (error) {
    if (error instanceof Error) {
      console.error("eBay API Error:", error.message);
    } else {
      console.error("Unexpected error occurred:", error);
    }
    throw error;
  }
};

export default fetchEbayProducts;
