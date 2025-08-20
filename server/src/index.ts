import { Hono } from "hono";

import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { searchRoutes } from "./routes/search";

export const app = new Hono();

app.basePath("/api");

const ALLOWED_ORIGINS = ["https://kassaklap.nl"];

function isAllowedOrigin(origin: string | undefined): boolean {
	if (!origin) return false;
	if (ALLOWED_ORIGINS.includes(origin)) return true;
	// Match any subdomain like *.kassaklap.vicainelli-cloudflare.workers.dev
	const regex =
		/^https?:\/\/[\w-]+-kassaklap\.vicainelli-cloudflare\.workers\.dev$/;
	return regex.test(origin);
}

app.use(
	cors({
		origin: (origin) => (isAllowedOrigin(origin) ? origin : ""),
	}),
);

app.use("*", async (c, next) => {
	const origin = c.req.header("Origin");
	if (origin && !isAllowedOrigin(origin)) {
		return c.text("Forbidden", 403);
	}
	await next();
});

app.use("*", logger());

const apiRoutes = app.basePath("/api").route("/search", searchRoutes);

export default app;
export type ApiRoutes = typeof apiRoutes;
