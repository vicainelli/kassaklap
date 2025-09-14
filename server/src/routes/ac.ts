// auto-complete API
import Fuse, { type IFuseOptions } from "fuse.js";
import { Hono } from "hono";
import productsData from "../data/products-grouped.json";

interface ProductCount {
  name: string;
  count: number;
}

// --- Stubs for missing types and functions ---

// Minimal ResultItem type
type ResultItem = {
  establishment: any;
  product: any;
  market: any;
};

// Stub for getMatchedProducts
function getMatchedProducts(establishment: any, match: any): any[] {
  // Return a dummy array for now
  return [];
}

// Stub for buildResultItem
function buildResultItem(establishment: any, product: any, market: any): ResultItem {
  return { establishment, product, market };
}

// Stub for market variable
const market = {};

const FUSE_OPTIONS: IFuseOptions<ProductCount> = {
  keys: ["name"], // search within product names
  includeScore: true,
  includeMatches: true, // ensure matches are included in results
  threshold: 0.3, // stricter sensitivity
  shouldSort: true,
  minMatchCharLength: 2, // avoid matches on very short queries
};

const productsArray: ProductCount[] = Object.entries(productsData).map(([name, count]) => ({
  name,
  count,
}));
const fuse = new Fuse(productsArray, FUSE_OPTIONS);

const autoCompleteRoutes = new Hono();


autoCompleteRoutes.get("/", async (c) => {
	const query = c.req.query("q");
	if (!query) {
		return c.json(
			{ message: 'Query parameter "q" is required' },
			{ status: 400 },
		);
	}

	const results = fetchSearchResults(query);
	return c.json({ results });
});

function fetchSearchResults(query: string): ResultItem[] {
  const lowerQuery = query.toLowerCase();
  const searchResults = fuse.search(query);
  const resultItems: ResultItem[] = [];
  for (const result of searchResults) {
    const product = result.item;
    // Only include products whose names start with the query (case-insensitive)
    if (typeof product.name === "string" && product.name.toLowerCase().startsWith(lowerQuery)) {
      resultItems.push(buildResultItem(undefined, product, market));
    }
  }
  return resultItems;
}

export { autoCompleteRoutes };
