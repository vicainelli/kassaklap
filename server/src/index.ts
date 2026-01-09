import { Hono } from "hono";
import { originValidationMiddleware, isAllowedOrigin } from "./middleware/origin";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { searchRoutes } from "./routes/search";
import { autoCompleteRoutes } from "./routes/ac";

export const app = new Hono();

app.use(
	cors({
		origin: (origin) => (isAllowedOrigin(origin) ? origin : ""),
	}),
);

app.use("*", originValidationMiddleware);

app.use("*", logger());

const apiRoutes =
  app.basePath("/api")
    .route("/search", searchRoutes)
    .route("/ac", autoCompleteRoutes);

export default app;
export type ApiRoutes = typeof apiRoutes;

// Only start the Node.js server during local development, not in Cloudflare Workers
// Use dynamic import to avoid loading @hono/node-server in Cloudflare Workers
// Check if we're NOT in a Cloudflare Workers environment
declare const caches: { default: unknown } | undefined;
const isCloudflareWorkers = typeof caches !== "undefined" && caches !== null && "default" in caches;
if (!isCloudflareWorkers) {
  import("@hono/node-server").then(({ serve }) => {
    serve({
      fetch: app.fetch,
      port: 3000,
    });
    console.log("Server running on http://localhost:3000");
  });
}
