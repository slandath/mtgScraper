import Fastify from 'fastify';
import scrape from './scrape.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fastifyStatic from '@fastify/static';
import multipart from '@fastify/multipart';

const fastify = Fastify({
  logger: true,
});
const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'pages'),
});
fastify.register(multipart, {
  attachFieldsToBody: 'keyValues',
});

fastify.get('/', function (request, reply) {
  reply.sendFile('index.html');
});

fastify.post('/scrape', async (request, reply) => {
  try {
    if (!request.body.cardField) {
      throw new Error(`${response.status}`);
    }
    const card = request.body.cardField;
    const url =
      'https://www.ebay.com/sch/i.html?_from=R40&_nkw=' +
      card +
      '+mtg&_sacat=0&LH_Sold=1&LH_Complete=1&LH_PrefLoc=1&_sop=13';
    const listings = await scrape(
      url,
      'div.s-item__wrapper.clearfix',
      'div.s-item__title',
      'span.s-item__price'
    );
    return reply.send(listings);
  } catch (error) {
    console.error(error);
   return reply.code(400);
  }
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
