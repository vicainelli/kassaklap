import type React from "react";
import { useEffect, useState } from "react";
import type { ResultItem } from "shared/dist";

import { Input } from "./ui/input";

// Debounce hook (SRP)
function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState(value);
	useEffect(() => {
		const handler = setTimeout(() => setDebouncedValue(value), delay);
		return () => clearTimeout(handler);
	}, [value, delay]);
	return debouncedValue;
}

// Fetch search results (SRP)
function useProductSearchResults(query: string): ResultItem[] | null {
	const [results, setResults] = useState<ResultItem[] | null>(null);
	useEffect(() => {
		if (query.length >= 3) {
			fetch(`/api/search?q=${encodeURIComponent(query)}`)
				.then((res) => res.json())
				.then((data) => setResults(data))
				.catch(() => setResults(null));
		} else {
			setResults(null);
		}
	}, [query]);
	return results;
}

export function ProductSearch() {
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearchTerm = useDebounce(searchTerm, 600);
	const results = useProductSearchResults(debouncedSearchTerm);

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
			<ResultsList results={results} />
		</>
	);
}

type ResultsListProps = {
	results: ResultItem[] | null;
};

function ResultsList({ results }: ResultsListProps) {
	if (!results) return <div>no results</div>;
	return (
		<ul className="flex flex-col gap-2">
			{results.map((item: ResultItem, index: number) => (
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
