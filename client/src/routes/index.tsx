import { createFileRoute } from "@tanstack/react-router";
import { ProductSearch } from "@/components/product-search";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { hcWithType } from "server/dist/client";
// import { useMutation } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
	component: Index,
});

// const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

// const client = hcWithType(SERVER_URL);

// type ResponseType = Awaited<ReturnType<typeof client.hello.$get>>;

function Index() {
	// const [data, setData] = useState<
	// 	Awaited<ReturnType<ResponseType["json"]>> | undefined
	// >();

	// const { mutate: sendRequest } = useMutation({
	// 	mutationFn: async () => {
	// 		try {
	// 			const res = await client.hello.$get();
	// 			if (!res.ok) {
	// 				console.log("Error fetching data");
	// 				return;
	// 			}
	// 			const data = await res.json();
	// 			setData(data);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	},
	// });

	return (
		<div className="max-w-xl mx-auto flex flex-col gap-6 items-center justify-center min-h-screen">
			<h1 className="text-5xl font-black">kassaklap</h1>
			<ProductSearch />
		</div>
	);

	// return (
	// 	<div className="max-w-xl mx-auto flex flex-col gap-6 items-center justify-center min-h-screen">

	// 		<h1 className="text-5xl font-black">kassaklap</h1>
	// 			{/* <Button onClick={() => sendRequest()}>Call API</Button> */}
	// 			{/* <Button variant="secondary" asChild>
	// 			</Button> */}
	// 		{/* {data && (
	// 			<pre className="bg-gray-100 p-4 rounded-md">
	// 				<code>
	// 					Message: {data.message} <br />
	// 					Success: {data.success.toString()}
	// 				</code>
	// 			</pre>
	// 		)} */}
	// 	</div>
	// );
}

export default Index;
