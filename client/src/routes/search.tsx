import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { ResultItem } from "shared/dist";
import { Input } from "../components/ui/input";

const SERVER_URL = import.meta.env.DEV ? "http://localhost:3000/api" : "/api";



async function fetchProductResults(query: string): Promise<ResultItem[]> {
	const res = await fetch(
		`${SERVER_URL}/search?q=${encodeURIComponent(query)}`,
	);
	if (!res.ok) throw new Error("Network response was not ok");
	return res.json();
}
const productSearchSchema = z.object({
	q: z.string().optional(),
});

type SearchRouteParams = z.infer<typeof productSearchSchema>;

export const Route = createFileRoute("/search")({
	validateSearch: (search: Record<string, unknown>): SearchRouteParams => {
		return {
			q: (search.q as string) || "",
		};
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { q } = Route.useSearch();
	const navigate = useNavigate();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const query = formData.get("search")?.toString() || "";
		navigate({
			to: "/search",
			search: { q: query },
		});
	};

	const query = useQuery({
		queryKey: ["search", q],
		queryFn: () => fetchProductResults(q || ""),
		enabled: !!q,
	});

	return (
		<div className="">
			<header>
				<div className="flex items-center justify-between p-4 mb-4">
					<h1 className="text-3xl font-bold">
					<a href="/">Kassaklap</a>
					</h1>
					<div>
						<button type="button">⚙</button>
					</div>
				</div>
			</header>

			<div className="p-4">
				<form onSubmit={handleSubmit}>
					<div className="flex justify-between gap-2">
						<Input
							type="text"
							name="search"
							placeholder="Search products..."
							value={q}
							className="w-full"
						/>
						<button type="submit">🔍</button>
					</div>
				</form>
			</div>

			<div className="p-4">
			  {query.isLoading && (<ResultListSkeleton /> )}

				{query?.data && (
					<ResultsList
						isError={query.isError}
						error={query.error}
						results={query.data}
					/>
				)}
			</div>
		</div>
	);
}

type ResultsListProps = {
	results: ResultItem[] | undefined;
	isError: boolean;
	error: unknown;
};

function ResultsList({ results, isError, error }: ResultsListProps) {
	if (isError) return <div>Error: {String(error)}</div>;
	if (!results || results.length === 0) return <div>No results</div>;
	return (
		<ul className="flex flex-col gap-4">
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
		<a href={item.l} target="_blank" rel="noopener noreferrer">
			<div className="flex gap-4 bg-card p-4 rounded-sm border-2 border-accent">
				<div className="w-10 h-10">
					<img
						alt={`logo ${item.e}`}
						src={`./${item.e}.png`}
						width={40}
						height={40}
					/>
				</div>
				<div className="flex-1">
					<p className="mb-2 line-clamp-2">{item.n}</p>
					<p>{item.s}</p>
				</div>
				<div className="flex flex-col items-end">
					<div>€{item.p}</div>
					{item.price_per_unit != null && item.unit_type ? (
						<div className="p-1 border-2 rounded-sm border-foreground bg-accent font-bold text-sm">
							€{item.price_per_unit.toFixed(2)}/{item.unit_type}
						</div>
					) : null}
				</div>
			</div>
		</a>
	);
}

function ResultListSkeleton() {
	const items = Array.from({ length: 6 }, (_, i) => i);
	return (
		<div className="space-y-4">
			{items.map((item) => (
				<div className="bg-accent rounded-md p-4">
					<div
						key={item}
						className="animate-pulse space-x-4 flex justify-between"
					>
						<div className="w-10 h-10 bg-gray-300"></div>
						<div className="flex-1">
							<div className="w-[75%] h-4 bg-gray-300"></div>
							<div className="w-[15%] h-4 bg-gray-300 mt-4"></div>
						</div>
						<div className="flex flex-col items-end">
							<div className="w-12 h-4 bg-gray-300"></div>
							<div className="w-16 h-6 bg-gray-300 mt-2"></div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
