import Fuse, { type IFuseOptions } from "fuse.js";
import { Hono } from "hono";
import type { RawProductsData, ResultItem } from "shared/dist";
import supermarketsData from "../data/supermarkets.json";

const searchRoutes = new Hono();

searchRoutes.get("/", async (c) => {
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

export { searchRoutes };

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

// Single Responsibility: Find market for establishment
function getMarketForEstablishment(establishmentName: string) {
	return ALLOWED_MARKETS.find(
		(m) => m.code === establishmentName.toLowerCase(),
	);
}

// Single Responsibility: Get matched products from establishment for a match
function getMatchedProducts(
	establishment: RawProductsData,
	match: { key?: string; value?: string },
): Array<(typeof establishment.d)[0]> {
	if (match.key !== "d.n" || !match.value) return [];
	return establishment.d.filter((p) => p.n === match.value);
}

// --- UNIT CONVERSION HELPERS ---
const unitofmeasures = [
  { unit: "gram", name: "gram", conversion: 1 },
  { unit: "gram", name: "gr", conversion: 1 },
  { unit: "gram", name: "g", conversion: 1 },
  { unit: "gram", name: "kilogram", conversion: 1000 },
  { unit: "gram", name: "kilo", conversion: 1000 },
  { unit: "gram", name: "kg", conversion: 1000 },
  { unit: "gram", name: "k", conversion: 1000 },
  { unit: "gram", name: "pond", conversion: 500 },
  { unit: "milliliter", name: "milliliter", conversion: 1 },
  { unit: "milliliter", name: "mililiter", conversion: 1 },
  { unit: "milliliter", name: "ml", conversion: 1 },
  { unit: "milliliter", name: "liter", conversion: 1000 },
  { unit: "milliliter", name: "l", conversion: 1000 },
  { unit: "milliliter", name: "deciliter", conversion: 100 },
  { unit: "milliliter", name: "dl", conversion: 100 },
  { unit: "milliliter", name: "centiliter", conversion: 10 },
  { unit: "milliliter", name: "cl", conversion: 10 },
];

const unitofmeasurePattern = new RegExp(
  "([\\d\\.,]+)\\s?(" + unitofmeasures.map(unit => unit.name).join("|") + ")", "i"
);

function parseAmount(value: string): { amount: number, unit: string } | null {
  if (value && unitofmeasurePattern.test(value)) {
    const match = value.match(unitofmeasurePattern);
    if (!match) return null;
    const amount = parseFloat(match[1].replace(",", "."));
    const unitObj = unitofmeasures.find(unit => unit.name === match[2].toLowerCase());
    if (!unitObj) return null;
    return { amount: amount * unitObj.conversion, unit: unitObj.unit };
  }
  return null;
}

function getPricePerUnitAndUnitType(price: number, amountStr: string): { price_per_unit: number | null, unit_type: string | null } {
  const parsed = parseAmount(amountStr);
  if (!parsed || !price || isNaN(price)) return { price_per_unit: null, unit_type: null };
  if (parsed.unit === "gram") {
    return {
      price_per_unit: Math.round((price / (parsed.amount / 1000)) * 100) / 100, // €/kg
      unit_type: "kg"
    };
  }
  if (parsed.unit === "milliliter") {
    return {
      price_per_unit: Math.round((price / (parsed.amount / 1000)) * 100) / 100, // €/liter
      unit_type: "liter"
    };
  }
  return {
    price_per_unit: Math.round(price * 100) / 100, // fallback: price per unit
    unit_type: "unit"
  };
}

// Single Responsibility: Build a result item
type Market = (typeof ALLOWED_MARKETS)[number];
type Product = RawProductsData["d"][number];

function buildResultItem(
	establishment: RawProductsData,
	product: Product,
	market: Market,
): ResultItem {
	const { price_per_unit, unit_type } = getPricePerUnitAndUnitType(product.p, product.s);
	return {
		e: establishment.n,
		n: product.n,
		p: product.p,
		s: product.s,
		l: market.base_url + product.l,
		price_per_unit,
		unit_type,
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
