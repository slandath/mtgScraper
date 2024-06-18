import Fastify from 'fastify';
import scrape from './scrape.js';

const fastify = Fastify({
  logger: true,
});
const port = process.env.PORT;

fastify.get('/', async (request, reply) => {
  const htmlContent =
    '<html lang="en"><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>MTG Scraper</title> </head> <body> <h1 style="text-align: center">Welcome to MTG Scraper!</h1> <p style="text-align: center">This web app scrapes Magic: The Gathering card prices from eBay sold listings.</p> <p style="text-align: center">To scrape, go to "/scrape".</p> </body></html>';
  
  reply.code(200).type('text/html; charset=utf-8').send(htmlContent);
});

fastify.get('/scrape', async (request, reply) => {
  const listings = await scrape('https://www.ebay.com/sch/i.html?_from=R40&_nkw=scrubland+mtg&_sacat=0&LH_Sold=1&LH_Complete=1&LH_PrefLoc=1&_sop=13',
    'div.s-item__wrapper.clearfix',
    'div.s-item__title',
    'span.s-item__price'
);
  return reply.send(listings);

});

const start = async () => {
  try {
    await fastify.listen({ port: port || 3000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
