import { expect, test } from "bun:test";
import { searchRoutes } from "./search";

// * Helper to simulate a request to the Hono route
async function request(path: string, options: RequestInit = {}) {
	const req = new Request(`http://localhost${path}`, options);
	return await searchRoutes.fetch(req);
}

test("GET / returns 400 if no query param", async () => {
	// * Arrange
	const path = "/?";

	// * Act
	const res = await request(path);
	const body = (await res.json()) as { message: string };

	// * Assert
	expect(res.status).toBe(400);
	expect(body.message).toMatch(/Query parameter/);
});

test("GET / returns results for valid query", async () => {
	// * Arrange
	const path = "/?q=test";

	// * Act
	const res = await request(path);
	const body = await res.json();

	// * Assert
	expect(res.status).toBe(200);
	expect(Array.isArray(body)).toBe(true);
	// * Optionally, check for expected structure if you know the data
	// * expect(body[0]).toHaveProperty("n");
});

test("GET / returns a 403 if header origin is invalid", async () => {
	// * Arrange
	const path = "/?q=test";
	const options = {
		headers: {
			Origin: "https://unauthorized.com",
		},
	};

	// * Act
	const res = await request(path, options);

	// * Assert
	expect(res.status).toBe(403);
});
