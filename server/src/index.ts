import { Hono } from "hono";

import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { searchRoutes } from "./routes/search";

export const app = new Hono();

app.basePath("/api");

const ALLOWED_ORIGIN = "https://kassaklap.nl"; // Change to your allowed domain

app.use(
	cors({
		origin: ALLOWED_ORIGIN,
	}),
);

app.use("*", async (c, next) => {
	const origin = c.req.header("Origin");
	if (origin && origin !== ALLOWED_ORIGIN) {
		return c.text("Forbidden", 403);
	}
	await next();
});

app.use("*", logger());

const apiRoutes = app
	.basePath("/api")
	// .get("/hello", (c) => c.json({ message: "Hello Worlds" }))
	.route("/search", searchRoutes);

export default app;
export type ApiRoutes = typeof apiRoutes;
