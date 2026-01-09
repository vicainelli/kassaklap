import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SearchForm } from "../components/search-form";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	const navigate = useNavigate();

	function handleSubmit(query: string) {
		navigate({
			to: "/search",
			search: { q: query },
		});
	}

	return (
		<div className="flex flex-col gap-8 mx-auto max-w-3xl">
			<h1 className="text-5xl font-black text-center">kassaklap</h1>
			<SearchForm onSubmit={handleSubmit} />
		</div>
	);
}

export default Index;
