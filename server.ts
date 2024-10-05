import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { compress } from "hono/compress";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

const app = new Hono();

app.use(logger());
app.use(prettyJSON());
app.use(compress());

app.use("/*", serveStatic({ root: "./public" }));

app.notFound((c) => {
  return c.text("404 Not Found", 404);
});

app.onError((err, c) => {
  console.error(err);
  return c.text("Internal server error", 500);
});

const port = Number(process.env.PORT) || 3000;
console.log(`Server is running on port ${port}`);

serve({ fetch: app.fetch, port });
