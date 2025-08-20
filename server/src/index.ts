import { Hono } from "hono";

import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { searchRoutes } from "./routes/search";

export const app = new Hono();

app.basePath("/api");

app.use(cors());
app.use("*", logger());

const apiRoutes = app
	.basePath("/api")
	.get("/hello", (c) => c.json({ message: "Hello Worlds" }))
	.route("/search", searchRoutes);

// Static
// app.get("*", serveStatic({ root: "../client/dist" }));
// app.get("*", serveStatic({ root: "../client/dist/index.html" }));

export default app;
export type ApiRoutes = typeof apiRoutes;
