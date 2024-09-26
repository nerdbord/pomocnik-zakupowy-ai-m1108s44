// lib/ebay/ebayService.js
const fetchEbayProducts = async (query, filter) => {
  const endpoint = "https://api.ebay.com/buy/browse/v1/item_summary/search"; // Your eBay search endpoint
  const apiKey = process.env.EBAY_TOKEN; // Store your eBay API key in .env
  console.log(`Searching ${query} in Ebay API by filter ${filter}`);
  const url = `${endpoint}?q=${encodeURIComponent(query)}&limit=3&filter=${filter}`; // Modify parameters as needed
  console.log("URL FROM EBAYSERVICE: ", url);
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "Accept-Language": "pl-PL",
    "X-EBAY-C-MARKETPLACE-ID": "EBAY_PL",
  };

  try {
    const response = await fetch(url, { headers });
    // console.log("RESPONSE FROM SERVICE: " + response.json());

    if (!response.ok) {
      throw new Error("Failed to fetch products from eBay");
    }

    const data = await response.json();

    console.log("Found items: ", data);
    // Example of formatting the response
    const products = data.itemSummaries.map((item) => ({
      title: item.title,
      price: item.price.value,
      currency: item.price.currency,
      link: item.itemWebUrl,
      image: item.image.imageUrl,
    }));

    return products;
  } catch (error) {
    console.error("eBay API Error:", error.message);
    throw error;
  }
};

export default fetchEbayProducts;
