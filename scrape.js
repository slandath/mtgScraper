import * as cheerio from 'cheerio';

// Constructor function to create a Listing object
class Listing {
  constructor(title, price) {
    this.title = title;
    this.price = price
  }
}

/* 
1. Makes FETCH request to URL
2. Using Cheerio, creates a data object of the HTML page
3. Crawls the data object looking for the parentEL
4. If found and passes the filter, stores the titleEl and priceEL inner text content
5. Creates a listing object using the titleEl and priceEl inner text content
6. Pushes listing object to the results array
7, This repeats for every instance of the parentEl
8. Returns the first 10 entries of the results array
*/
async function scrape(url, parentEl, titleEl, priceEl) {
  try {
    const response = await fetch(url);
    if (!response) {
      throw new Error('Failed to fetch');
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    const results = [];
    $(parentEl, html).each(function () {
        const title = $(this).find(titleEl)
        const price = $(this).find(priceEl)
        if ($(title).text() === "Shop on eBay") {
            return
        }
      const listing = new Listing($(title).text(), $(price).text())
      results.push(listing);
    });
    return results.slice(0,10);
  } catch (error) {
    console.error(error);
    return error;
  }
}

export default scrape;
