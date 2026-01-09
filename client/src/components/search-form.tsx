import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useConditionalTracking, TRACKING_EVENTS } from "@/lib/analytics";

type SearchFormProps = {
	initialQuery?: string;
	onSubmit?: (query: string) => void;
};

export function SearchForm({ initialQuery = "", onSubmit }: SearchFormProps) {
	const [searchQuery, setSearchQuery] = useState(initialQuery);
	const { track } = useConditionalTracking();

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

		onSubmit?.(query);
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="relative">
				<Input
					type="text"
					name="search"
					placeholder="Search products..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="pr-12 h-12 text-base"
				/>
				<Button
					size="icon"
					type="submit"
					variant="ghost"
					className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
				>
					<Search className="h-5 w-5" />
				</Button>
			</div>
		</form>
	);
}
