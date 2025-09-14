import { Hono } from "hono";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { originValidationMiddleware } from "../middleware/origin";
import { searchRoutes as baseSearchRoutes } from "./search";

// Polyfill for Request and RequestInit if needed (Node 18+ has global Request)
let RequestPolyfill: typeof Request;
try {
	RequestPolyfill = Request;
} catch {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	RequestPolyfill = require("undici").Request;
}
type RequestInitPolyfill =
	| RequestInit
	| ConstructorParameters<typeof RequestPolyfill>[1];

describe.skip("search-http routes", () => {
	beforeAll(() => {
		process.env.NODE_ENV = "production";
	});

	let searchRoutes: Hono;

	beforeEach(() => {
		// Re-create the routes and apply middleware after setting NODE_ENV
		searchRoutes = new Hono();
		searchRoutes.use(originValidationMiddleware);
		searchRoutes.route("/", baseSearchRoutes);
	});

	// * Helper to simulate a request to the Hono route
	async function request(path: string, options: RequestInitPolyfill = {}) {
			const headers = options.headers as
				| Record<string, string>
				| [string, string][]
				| Headers
				| undefined;
			// Convert headers to a plain object for easier manipulation
			let headersObj: Record<string, string> = {};

			if (headers instanceof Headers) {
				headers.forEach((value, key) => {
					headersObj[key] = value;
				});
			} else if (Array.isArray(headers)) {
				for (const [key, value] of headers) {
					headersObj[key] = value;
				}
			} else if (headers) {
				// Only copy string values, skip undefined
				for (const key in headers) {
					const value = headers[key];
					if (typeof value === "string") {
						headersObj[key] = value;
					}
				}
			}

			// Set Origin header if not present
			if (!Object.keys(headersObj).some((k) => k.toLowerCase() === "origin")) {
				headersObj["Origin"] = "https://kassaklap.nl";
			}

			const req = new RequestPolyfill(`http://localhost${path}`, {
				...options,
				headers: headersObj,
			});
			return await searchRoutes.fetch(req);
		}

	it("GET / returns 400 if no query param", async () => {
		const path = "/?";
		const res = await request(path);
		const body = (await res.json()) as { message: string };
		expect(res.status).toBe(400);
		expect(body.message).toMatch(/Query parameter/);
	});

	it("GET / returns results for valid query", async () => {
		const path = "/?q=test";
		const res = await request(path);
		const body = await res.json();
		expect(res.status).toBe(200);
		expect(Array.isArray(body)).toBe(true);
	});

	it("GET / returns a 403 if header origin is invalid", async () => {
		const path = "/?q=test";
		const options = {
			headers: {
				Origin: "https://unauthorized.com",
			},
		};
		const res = await request(path, options);
		expect(res.status).toBe(403);
	});
});
