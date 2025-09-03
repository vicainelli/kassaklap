import { createFileRoute } from "@tanstack/react-router";
import { Input } from "../components/ui/input";


export const Route = createFileRoute("/")({
	component: Index,
});


function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const query = formData.get("search")?.toString() || "";
  window.location.href = `/search?q=${encodeURIComponent(query)}`;
}

function Index() {
	return (
		<div className="max-w-xl mx-auto flex flex-col gap-6 items-center justify-center min-h-screen">
			<h1 className="text-5xl font-black">kassaklap</h1>
			<div>
			<form onSubmit={handleSubmit}>
			<Input
				type="text"
				name="search"
				placeholder="Search products..."
				value={""}
				className="w-full"
			/>
			<button type="submit">search</button>
			</form>
			</div>
		</div>
	);
}

export default Index;
