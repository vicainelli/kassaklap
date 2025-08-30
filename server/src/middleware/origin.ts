import type { Next, Context} from "hono";
const ALLOWED_ORIGINS = ["https://kassaklap.nl"];
const allowedOriginRegex = /^https?:\/\/[\w-]+-kassaklap\.vicainelli-cloudflare\.workers\.dev$/;

// Use Bun.env for environment detection
function isDevelopment() {
	return (
		typeof Bun !== "undefined" &&
		(Bun.env.NODE_ENV === "development" || Bun.env.NODE_ENV === "test")
	);
}

export function isAllowedOrigin(origin: string | undefined): boolean {
	if (isDevelopment()) return true;
	if (!origin) return false;
	if (ALLOWED_ORIGINS.includes(origin)) return true;
	return allowedOriginRegex.test(origin);
}

export const originValidationMiddleware = async (c: Context, next: Next) => {
	const origin = c.req.header("Origin");
	if (origin && !isAllowedOrigin(origin)) {
		return c.text("Forbidden", 403);
	}
	await next();
};
