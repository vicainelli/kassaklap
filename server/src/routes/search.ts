import Fuse, { type IFuseOptions } from "fuse.js";
import { Hono } from "hono";
import type { RawProductsData, ResultItem } from "shared/dist";
import supermarketsData from "../data/supermarkets.json";

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


const typedProductsData: RawProductsData[] = supermarketsData as RawProductsData[];
const fuse = new Fuse(typedProductsData, FUSE_OPTIONS);

// Single Responsibility: Find market for establishment
function getMarketForEstablishment(establishmentName: string) {
	return ALLOWED_MARKETS.find(
		(m) => m.code === establishmentName.toLowerCase()
	);
}

// Single Responsibility: Get matched products from establishment for a match
function getMatchedProducts(
	establishment: RawProductsData,
	match: { key?: string; value?: string }
): Array<typeof establishment.d[0]> {
	if (match.key !== "d.n" || !match.value) return [];
	return establishment.d.filter((p) => p.n === match.value);
}

// Single Responsibility: Build a result item
type Market = typeof ALLOWED_MARKETS[number];
type Product = RawProductsData["d"][number];

function buildResultItem(
	establishment: RawProductsData,
	product: Product,
	market: Market
): ResultItem {
	return {
		e: establishment.n,
		n: product.n,
		p: product.p,
		s: product.s,
		l: market.base_url + product.l,
	};
}

// Orchestrator: Compose results using helpers
function fetchSearchResults(query: string): ResultItem[] {
	const searchResults = fuse.search(query);
	const resultItems: ResultItem[] = [];
		for (const result of searchResults) {
			const establishment = result.item;
			const market = getMarketForEstablishment(establishment.n);
			if (!market) continue;
			if (result.matches) {
				for (const match of result.matches) {
					// Type guard: only call helper if key and value are defined
					if (typeof match.key === "string" && typeof match.value === "string") {
						const matchedProducts = getMatchedProducts(establishment, match);
						for (const product of matchedProducts) {
							resultItems.push(buildResultItem(establishment, product, market));
						}
					}
				}
			}
		}
	return resultItems;
}
