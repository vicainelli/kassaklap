import { Hono } from "hono";
import { originValidationMiddleware, isAllowedOrigin } from "./middleware/origin";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { searchRoutes } from "./routes/search";

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
    .route("/search", searchRoutes);

import { serve } from "@hono/node-server";

export default app;
export type ApiRoutes = typeof apiRoutes;

serve({
  fetch: app.fetch,
  port: 3000,
});
console.log("Server running on http://localhost:3000");
