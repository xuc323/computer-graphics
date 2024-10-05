import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { timeout } from "hono/timeout";

const app = new Hono();

app.use(logger());
app.use(
  "/*",
  timeout(60_000, (c) => {
    return new HTTPException(408, {
      message: "Request timeout. Please try again later.",
    });
  })
);
app.use(prettyJSON());

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
