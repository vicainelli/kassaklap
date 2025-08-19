import { Hono } from "hono";
import Fuse, { type IFuseOptions } from "fuse.js";
import supermarketsData from "../data/supermarkets.json";
import type { RawProductsData, ResultItem } from "shared/dist";

export const searchRoutes = new Hono().get("/", async (c) => {
	const query = c.req.query("q");
	if (!query) {
		return c.json(
			{ message: 'Query parameter "q" is required' },
			{ status: 400 },
		);
	}

	const results = await fetchSearchResults(query);
	return c.json(results);
});

const ALLOWED_MARKETS = [
	{
		code: "ah",
		name: "Albert Heijn",
		brand_color: "#02ADE6",
		base_url: "https://www.ah.nl/producten/product/",
	},
	{
		code: "dirk",
		name: "Dirk",
		brand_color: "#E30614",
		base_url: "https://www.dirk.nl/boodschappen/x/x/x/",
	},
	{
		code: "jumbo",
		name: "Jumbo",
		brand_color: "#EDB716",
		base_url: "https://www.jumbo.com/producten/",
	},
];

const FUSE_OPTIONS: IFuseOptions<RawProductsData> = {
	keys: ["d.n"], // search within product names
	includeScore: true,
	includeMatches: true, // ensure matches are included in results
	threshold: 0.3, // stricter sensitivity
	shouldSort: true,
	minMatchCharLength: 2, // avoid matches on very short queries
};

const typedProductsData: RawProductsData[] =
	supermarketsData as RawProductsData[];
const fuse = new Fuse(typedProductsData, FUSE_OPTIONS);

function fetchSearchResults(query: string): ResultItem[] {
	const searchResults = fuse.search(query);
	const resultItems: ResultItem[] = [];
	for (const result of searchResults) {
		const establishment = result.item;
		// Find the market object for this establishment
		const market = ALLOWED_MARKETS.find(
			(m) => m.code === establishment.n.toLowerCase(),
		);
		if (!market) continue;
		if (result.matches) {
			for (const match of result.matches) {
				if (match.key === "d.n" && match.value) {
					// Find the product in establishment.d with matching name
					const matchedProducts = establishment.d.filter(
						(p) => p.n === match.value,
					);
					for (const product of matchedProducts) {
						resultItems.push({
							e: establishment.n,
							n: product.n,
							p: product.p,
							s: product.s,
							l: market.base_url + product.l,
						});
					}
				}
			}
		}
	}
	return resultItems;
}
