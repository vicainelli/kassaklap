import type React from "react";
import { useState, useEffect } from "react";
import type { ResultItem } from "shared/dist";

import { Input } from "./ui/input";

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState(value);
	useEffect(() => {
		const handler = setTimeout(() => setDebouncedValue(value), delay);
		return () => clearTimeout(handler);
	}, [value, delay]);
	return debouncedValue;
}

export function ProductSearch() {
	const [searchTerm, setSearchTerm] = useState("");
	const [results, setResults] = useState<ResultItem[] | null>(null); // For later use
	const debouncedSearchTerm = useDebounce(searchTerm, 600);

	useEffect(() => {
		if (debouncedSearchTerm.length >= 3) {
			fetch(`/api/search?q=${encodeURIComponent(debouncedSearchTerm)}`)
				.then((res) => res.json())
				.then((data) => setResults(data))
				.catch(() => setResults(null));
		} else {
			setResults(null);
		}
	}, [debouncedSearchTerm]);

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

const ResultsList = ({ results }: ResultsListProps) => {
	if (!results) return <div>no results</div>;

	return (
		<ul className="flex flex-col gap-2">
			{results.map((item: ResultItem, index: number) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: no id yet
				<li key={index}>
					<a
						className="flex gap-2"
						href={item.l}
						target="_blank"
						rel="noopener noreferrer"
					>
						<img alt={`logo ${item.e}`} src={`./${item.e}.png`} width={24} />
						<span>
							{item.n} / €{item.p} / {item.s}
						</span>
					</a>
				</li>
			))}
		</ul>
	);
};
