import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "../components/ui/input";
import { useConditionalTracking, TRACKING_EVENTS } from "../lib/analytics";


export const Route = createFileRoute("/")({
	component: Index,
});



function Index() {
  const navigate = useNavigate();

  const { track } = useConditionalTracking();

  const [searchQuery, setSearchQuery] = useState("");

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

		navigate({
			to: "/search",
			search: { q: query },
		});
  }

	return (
		<div className="flex flex-col gap-8 mx-auto max-w-3xl">
			<h1 className="text-5xl font-black text-center">kassaklap</h1>

			<form onSubmit={handleSubmit}>
			<div className="flex justify-between gap-2">
			<Input
				type="text"
				name="search"
				placeholder="Search products..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className="w-full"
			/>
			<button type="submit">🔍</button>
			</div>
			</form>
		</div>
	);
}

export default Index;
