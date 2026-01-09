// auto-complete API
import Fuse, { type IFuseOptions } from "fuse.js";
import { Hono } from "hono";
import productsData from "../data/products-grouped.json";

interface ProductCount {
  name: string;
  count: number;
}

const FUSE_OPTIONS: IFuseOptions<ProductCount> = {
  keys: ["name"],
  includeScore: true,
  threshold: 0.3,
  shouldSort: true,
  minMatchCharLength: 2,
};

const productsArray: ProductCount[] = Object.entries(productsData).map(
  ([name, count]) => ({
    name,
    count,
  }),
);
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

function fetchSearchResults(query: string): string[] {
  const lowerQuery = query.toLowerCase();
  const searchResults = fuse.search(query);
  const resultNames: string[] = [];

  for (const result of searchResults) {
    const product = result.item;
    // Only include products whose names start with the query (case-insensitive)
    if (
      typeof product.name === "string" &&
      product.name.toLowerCase().startsWith(lowerQuery)
    ) {
      resultNames.push(product.name);
    }
  }

  return resultNames;
}

export { autoCompleteRoutes };
