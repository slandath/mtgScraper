# MTG Scraper
## Purpose
I was bidding on auctions for Magic: The Gathering cards, and I needed to know the approximate value of the card being auctioned.  
### Why Build a Tool?
Getting pricing data on older, "Reserved List" MTG cards can be tricky for the following reasons:
* The number of transactions for "Reserved List" cards are much small than modern cards.
* Stores and websites will often list theses items above market value to "get people in the door".
Due to this, I've found the best way to get accurate pricing data is to look at completed sales on websites like eBay.  
## How Does the Tool Work?
### Built With
![Static Badge](https://img.shields.io/badge/Node.JS-_?style=for-the-badge&logo=nodedotjs&logoColor=%23ffffff&color=%235FA04E&link=https%3A%2F%2Fnodejs.org%2Fen)  
![Static Badge](https://img.shields.io/badge/Nodemon-_?style=for-the-badge&logo=nodemon&logoColor=%23ffffff&color=%2376D04B&link=https%3A%2F%2Fnodemon.io%2F)  
![Static Badge](https://img.shields.io/badge/Fastify-_?style=for-the-badge&logo=fastify&logoColor=%23ffffff&color=%23000000&link=https%3A%2F%2Ffastify.dev%2F)  
![Static Badge](https://img.shields.io/badge/Cheerio-_?style=for-the-badge&logo=cheerio&logoColor=%23ffffff&color=%23E88C1F&link=https%3A%2F%2Fcheerio.js.org%2F)  
![Static Badge](https://img.shields.io/badge/Tailwind%20CSS-_?style=for-the-badge&logo=tailwindcss&logoColor=%23ffffff&color=%2306B6D4&link=https%3A%2F%2Ftailwindcss.com%2F)


1. Cheerio queries a web page and creates a "Cheerio Object", which is a copy of the contents of the webpage.
2. Using this object, you can extract the pertinent information from the web page.  In my case, it is the sold price of an MTG card.
3. A simple HTML page is served to view the data and make new queries.

## Getting Started

1. Fork the repo  
   
```bash
git clone https://github.com/slandath/mtgScraper.git
```  

2. Install  [Node.JS](https://nodejs.org/en)
   
   
3. Install Dependencies  

```bash
npm install
```  

4. Update URL
In the app.js file in the pages directory, update the url.

5. Run the app  
   
```bash
npm run dev
```

## License

Distributed under the Apache License.  See `LICENSE.txt` for more information.
