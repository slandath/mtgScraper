import Fastify from "fastify";
import scrape from "./scrape.js";
import path from "path";
import { fileURLToPath } from "url";
import fastifyStatic from "@fastify/static";

const fastify = Fastify({
  logger: true,
});
const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "pages"),
});

fastify.get("/", function (request, reply) {
  reply.sendFile("index.html");
});

fastify.get("/scrape", async (request, reply) => {
  const listings = await scrape(
    "https://www.ebay.com/sch/i.html?_from=R40&_nkw=scrubland+mtg&_sacat=0&LH_Sold=1&LH_Complete=1&LH_PrefLoc=1&_sop=13",
    "div.s-item__wrapper.clearfix",
    "div.s-item__title",
    "span.s-item__price"
  );
  return reply.send(listings);
});

const start = async () => {
  try {
    await fastify.listen({ port: port || 3000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
