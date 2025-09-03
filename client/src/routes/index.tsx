import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Input } from "../components/ui/input";


export const Route = createFileRoute("/")({
	component: Index,
});



function Index() {
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const query = formData.get("search")?.toString() || "";
		navigate({
			to: "/search",
			search: { q: query },
		});
  }

	return (
		<div className="mx-auto flex flex-col gap-6 items-center justify-center min-h-screen">
			<h1 className="text-5xl font-black">kassaklap</h1>

			<form onSubmit={handleSubmit}>
			<div className="flex justify-between gap-2">
			<Input
				type="text"
				name="search"
				placeholder="Search products..."
				value={""}
				className="w-full"
			/>
			<button type="submit">🔍</button>
			</div>
			</form>
		</div>
	);
}

export default Index;
