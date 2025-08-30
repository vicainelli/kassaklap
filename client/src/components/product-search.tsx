import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import type { ResultItem } from "shared/dist";
import { Input } from "./ui/input";

const SERVER_URL = import.meta.env.DEV ? "http://localhost:3000/api" : "/api";

// Debounce hook (SRP)
function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState(value);
	React.useEffect(() => {
		const handler = setTimeout(() => setDebouncedValue(value), delay);
		return () => clearTimeout(handler);
	}, [value, delay]);
	return debouncedValue;
}

async function fetchProductResults(query: string): Promise<ResultItem[]> {
	const res = await fetch(
		`${SERVER_URL}/search?q=${encodeURIComponent(query)}`,
	);
	if (!res.ok) throw new Error("Network response was not ok");
	return res.json();
}

export function ProductSearch() {
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearchTerm = useDebounce(searchTerm, 600);

	const {
		data: results,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["productSearch", debouncedSearchTerm],
		queryFn: () => fetchProductResults(debouncedSearchTerm),
		enabled: debouncedSearchTerm.length >= 3,
		staleTime: 1000 * 60, // 1 minute cache
	});

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (typeof window !== "undefined" && (window as any).posthog) {
			(window as any).posthog.capture("search_product", {
				value: e.target.value,
			});
		}
		setSearchTerm(e.target.value);
	};

	return (
		<>
			<div className="space-x-4">
				<Input
					type="text"
					placeholder="Search products..."
					value={searchTerm}
					onChange={handleSearch}
					className="w-full"
				/>
			</div>
			<ResultsList
				results={results}
				isLoading={isLoading}
				isError={isError}
				error={error}
			/>
		</>
	);
}

type ResultsListProps = {
	results: ResultItem[] | undefined;
	isLoading: boolean;
	isError: boolean;
	error: unknown;
};

function ResultsList({ results, isLoading, isError, error }: ResultsListProps) {
	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error: {String(error)}</div>;
	if (!results || results.length === 0) return <div>No results</div>;
	return (
		<ul className="flex flex-col gap-2">
			{results.map((item, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: no id yet
				<li key={index}>
					<ResultListItem item={item} />
				</li>
			))}
		</ul>
	);
}

function ResultListItem({ item }: { item: ResultItem }) {
	return (
		<a
			className="flex gap-2"
			href={item.l}
			target="_blank"
			rel="noopener noreferrer"
		>
			<div className="w-8 h-8">
				<img
					alt={`logo ${item.e}`}
					src={`./${item.e}.png`}
					width={32}
					height={32}
				/>
			</div>
			<div className="flex-1">
  			<p>{item.n}</p>
				<span>
					 / €{item.p} / {item.s}
					{item.price_per_unit != null && item.unit_type ? (
						<span className="p-2 bg-accent rounded-sm">
							€{item.price_per_unit.toFixed(2)} per {item.unit_type}
						</span>
					) : null}
				</span>
			</div>
		</a>
	);
}
