import Fastify from 'fastify';
import scrape from './scrape.js';

const fastify = Fastify({
  logger: true,
});

const port = process.env.PORT;

fastify.get('/', async () => {
  return { hello: 'world' };
});
fastify.get('/scrape', async () => {
  return scrape('https://www.ebay.com/sch/i.html?_from=R40&_nkw=scrubland+mtg&_sacat=0&LH_Sold=1&LH_Complete=1&LH_PrefLoc=1&_sop=13');
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
