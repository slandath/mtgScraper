import * as cheerio from 'cheerio';

class Listing {
  constructor(title, price) {
    this.title = title;
    this.price = price
  }
}

async function scrape(url) {
  try {
    const response = await fetch(url);
    if (!response) {
      throw new Error('Failed to fetch');
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    const results = [];
    $('div.s-item__wrapper.clearfix', html).each(function () {
        const title = $(this).find('div.s-item__title')
        const price = $(this).find('span.s-item__price')
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
