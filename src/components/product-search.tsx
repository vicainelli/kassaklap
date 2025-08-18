import Fuse from "fuse.js";
import debounce from "lodash.debounce";
import type React from "react";
import { useCallback, useMemo, useState } from "react";
import productsData from "@/data/supermarkets.json";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

interface Product {
	n: string; // Name
	p: number; // Price
	s: string; // Size/Serving
	l: string; // Location/Link
}

interface ProductsData {
	n: string; // supermarket name
	d: Product[];
}

// avaiable markets
const AVAIABLE_STORES = [];

const ALLOWED_MARKETS = [
	{
		code: "ah",
		name: "Albert Heijn",
		brand_color: "#02ADE6",
		base_url: "https://www.ah.nl/producten/product",
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

export function ProductSearch() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

	const fuse = useMemo(() => {
		const allowedMarketProducts = productsData
			.filter((market) => ALLOWED_MARKETS.some((am) => am.code === market.n))
			.flatMap((market) => market.d);
		return new Fuse(allowedMarketProducts, {
			keys: ["n"],
			threshold: 0.3,
			includeScore: true,
		});
	}, []);

	const debouncedSearch = useCallback(
		debounce((term: string) => {
			if (term.length >= 3) {
				const results = fuse
					.search(term)
					.map((result) => {
						const market = productsData.find((market) =>
							market.d.some((product) => product === result.item),
						);
						const allowedMarket = ALLOWED_MARKETS.find(
							(am) => am.code === market.n,
						);
						return allowedMarket
							? {
									...result.item,
									marketCode: market.n,
									marketName: allowedMarket.name,
									brandColor: allowedMarket.brand_color,
									baseUrl: allowedMarket.base_url,
								}
							: null;
					})
					.filter(Boolean);
				setFilteredProducts(results);
			} else {
				setFilteredProducts([]);
			}
		}, 300),
		[fuse],
	);

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		const term = event.target.value;
		setSearchTerm(term);
		debouncedSearch(term);
	};

	return (
		<div className="space-y-4">
			<Input
				type="text"
				placeholder="Search products..."
				value={searchTerm}
				onChange={handleSearch}
				className="w-full"
			/>

			{searchTerm.length >= 3 && (
				<div>
					{filteredProducts.length > 0 ? (
						filteredProducts.map((product, index) => (
							<Card
								key={index}
								className={`mb-2 border-r-4`}
								style={{
									borderRightColor: product.brandColor || "transparent",
								}}
							>
								<CardHeader className="pb-2">
									<p className="text-xs text-muted-foreground uppercase tracking-wider">
										{product.marketName}
									</p>
									<CardTitle className="text-sm">{product.n}</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="flex flex-col space-y-2">
										<div className="flex justify-between">
											<span>{product.s}</span>
											<span>€{product.p.toFixed(2)}</span>
										</div>
										{product.l && product.baseUrl && (
											<a
												href={`${product.baseUrl}/${product.l}`}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-600 hover:underline"
											>
												View Product
											</a>
										)}
									</div>
								</CardContent>
							</Card>
						))
					) : (
						<p className="text-center text-muted-foreground">
							No products found
						</p>
					)}
				</div>
			)}
		</div>
	);
}
