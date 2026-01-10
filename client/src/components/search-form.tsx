import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useConditionalTracking, TRACKING_EVENTS } from "@/lib/analytics";

const SERVER_URL = import.meta.env.DEV
	? "http://localhost:3000/api"
	: "/api";

type SearchFormProps = {
	initialQuery?: string;
	onSubmit?: (query: string) => void;
};

export function SearchForm({ initialQuery = "", onSubmit }: SearchFormProps) {
	const [searchQuery, setSearchQuery] = useState(initialQuery);
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const { track } = useConditionalTracking();
	const containerRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLUListElement>(null);

	// Fetch autocomplete suggestions
	useEffect(() => {
		if (!searchQuery || searchQuery.length < 3) {
			setSuggestions([]);
			setFocusedIndex(-1);
			return;
		}

		const debounceTimer = setTimeout(async () => {
			try {
				const res = await fetch(
					`${SERVER_URL}/ac?q=${encodeURIComponent(searchQuery)}`,
				);
				if (res.ok) {
					const data = await res.json();
					setSuggestions(data.results?.slice(0, 8) || []);
					setFocusedIndex(-1);
				}
			} catch {
				// Ignore errors
			}
		}, 300);

		return () => clearTimeout(debounceTimer);
	}, [searchQuery]);

	// Scroll focused item into view
	useEffect(() => {
		if (focusedIndex >= 0 && listRef.current) {
			const listItems = listRef.current.querySelectorAll("li");
			const focusedItem = listItems[focusedIndex] as HTMLElement;
			if (focusedItem) {
				focusedItem.scrollIntoView({ block: "nearest" });
			}
		}
	}, [focusedIndex]);

	// Close suggestions when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setShowSuggestions(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const query = searchQuery;

		// Track search with user consent
		track({
			eventName: TRACKING_EVENTS.SEARCH_PRODUCT,
			properties: {
				search_query: query,
				search_length: query.length,
			},
		});

		setShowSuggestions(false);
		onSubmit?.(query);
	}

	function handleSuggestionClick(suggestion: string) {
		setSearchQuery(suggestion);
		setShowSuggestions(false);
		setFocusedIndex(-1);
		track({
			eventName: TRACKING_EVENTS.SEARCH_PRODUCT,
			properties: {
				search_query: suggestion,
				search_length: suggestion.length,
			},
		});
		onSubmit?.(suggestion);
	}

	function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
		if (!showSuggestions || suggestions.length === 0) return;

		switch (event.key) {
			case "ArrowDown":
				event.preventDefault();
				setFocusedIndex((prev) => {
					if (prev < suggestions.length - 1) {
						return prev + 1;
					}
					return prev;
				});
				break;

			case "ArrowUp":
				event.preventDefault();
				setFocusedIndex((prev) => {
					if (prev > 0) {
						return prev - 1;
					} else if (prev === -1) {
						// Wrap to the last item
						return suggestions.length - 1;
					}
					return prev;
				});
				break;

			case "Enter":
				if (focusedIndex >= 0) {
					event.preventDefault();
					const selectedSuggestion = suggestions[focusedIndex];
					setSearchQuery(selectedSuggestion);
					setShowSuggestions(false);
					track({
						eventName: TRACKING_EVENTS.SEARCH_PRODUCT,
						properties: {
							search_query: selectedSuggestion,
							search_length: selectedSuggestion.length,
						},
					});
					onSubmit?.(selectedSuggestion);
					setFocusedIndex(-1);
				}
				break;

			case "Escape":
				event.preventDefault();
				setShowSuggestions(false);
				setFocusedIndex(-1);
				break;

			case "Tab":
				setShowSuggestions(false);
				setFocusedIndex(-1);
				break;
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="relative" ref={containerRef}>
				<Input
					type="text"
					name="search"
					placeholder="Search products..."
					value={searchQuery}
					onChange={(e) => {
						setSearchQuery(e.target.value);
						setShowSuggestions(true);
					}}
					onFocus={() => setShowSuggestions(true)}
					onKeyDown={handleKeyDown}
					role="combobox"
					aria-autocomplete="list"
					aria-expanded={showSuggestions && suggestions.length > 0}
					aria-controls="suggestions-list"
					aria-activedescendant={
						focusedIndex >= 0 ? `suggestion-${focusedIndex}` : undefined
					}
					className="pr-12 h-12 text-base"
					autoComplete="off"
				/>
				<Button
					size="icon"
					type="submit"
					variant="ghost"
					className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
				>
					<Search className="h-5 w-5" />
				</Button>

				{showSuggestions && suggestions.length > 0 && (
					<ul
						ref={listRef}
						id="suggestions-list"
						role="listbox"
						className="absolute z-10 w-full mt-1 bg-background border border-input rounded-md shadow-lg max-h-60 overflow-auto"
					>
						{suggestions.map((suggestion, index) => (
							<li
								key={index}
								id={`suggestion-${index}`}
								role="option"
								aria-selected={focusedIndex === index}
								className={`px-4 py-2 cursor-pointer ${
									focusedIndex === index
										? "bg-accent"
										: "hover:bg-accent"
								}`}
								onMouseDown={(e) => {
									e.preventDefault();
									handleSuggestionClick(suggestion);
								}}
							>
								{suggestion}
							</li>
						))}
					</ul>
				)}
			</div>
		</form>
	);
}
