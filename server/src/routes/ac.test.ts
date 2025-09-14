import { beforeAll, describe, expect, it } from "vitest";
import { autoCompleteRoutes } from "./ac";

// Use global Request if available, otherwise import from undici
let RequestPolyfill: typeof Request;
try {
	RequestPolyfill = Request;
} catch {
	RequestPolyfill = require("undici").Request;
}

// * Helper to simulate a request to the Hono route
async function request(path: string, options: RequestInit = {}) {
	const req = new RequestPolyfill(`http://localhost${path}`, {
		...options,
		headers: {
			Origin: "http://localhost:3000",
			...(options.headers || {}),
		},
	});
	return await autoCompleteRoutes.fetch(req);
}

describe("auto-complete routes", () => {
	beforeAll(() => {
		process.env.NODE_ENV = "production";
	});
	it("GET / returns 400 if no query param", async () => {
		// * Arrange
		const path = "/?";

		// * Act
		const res = await request(path);
		const body = (await res.json()) as { message: string };

		// * Assert
		expect(res.status).toBe(400);
		expect(body.message).toMatch(/Query parameter/);
	});

	it("GET / returns results for valid query", async () => {
		// * Arrange
		const path = "/?q=a";
		// * Act
		const res = await request(path);
		const body = (await res.json()) as { results: unknown[] };
		// * Assert
		expect(res.status).toBe(200);
		// should return top words start with 'a'
		expect(Array.isArray(body.results)).toBe(true);
		expect(body.results.length).toBeGreaterThan(0);

		expect(body.results).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					product: expect.objectContaining({
						name: expect.stringMatching(/^a/i),
					}),
				}),
			]),
		);
	});

	it("GET / returns results for valid query", async () => {
		// * Arrange
		const path = "/?q=a";
		// * Act
		const res = await request(path);
		const body = (await res.json()) as { results: unknown[] };
		// * Assert
		// should return top words start with 'aa'
		expect(res.status).toBe(200);
		expect(Array.isArray(body.results)).toBe(true);
		expect(body.results.length).toBeGreaterThan(0);

		expect(body.results).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					product: expect.objectContaining({
						name: expect.stringMatching(/^aa/i),
					}),
				}),
			]),
		);
	});
});
