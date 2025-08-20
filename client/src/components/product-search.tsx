import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import type { ResultItem } from "shared/dist";
import { Input } from "./ui/input";

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
	const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
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

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSearchTerm(e.target.value);

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
			<div className="w-6 h-6">
				<img
					alt={`logo ${item.e}`}
					src={`./${item.e}.png`}
					width={24}
					height={24}
				/>
			</div>
			<div className="flex-1">
				<span>
					{item.n} / €{item.p} / {item.s}
				</span>
			</div>
		</a>
	);
}
