import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { PostHogProvider, PostHogErrorBoundary } from "posthog-js/react";
import "./index.css";

// Dynamic dark mode: sync .dark class on <body> with system preferences
function syncDarkModeClass() {
	const isDark =
		window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
	document.body.classList.toggle("dark", isDark);
}

// Initial sync
syncDarkModeClass();

// Listen for changes
if (window.matchMedia) {
	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", syncDarkModeClass);
}

const queryClient = new QueryClient();

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error(
		"Root element not found. Check if it's in your index.html or if the id is correct.",
	);
}

// Render the app
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<PostHogProvider
				apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
				options={{
					api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
					defaults: "2025-05-24",
					capture_exceptions: true,
					debug: import.meta.env.MODE === "development",
				}}
			>
				<PostHogErrorBoundary fallback={<ErrorFallback />}>
					<QueryClientProvider client={queryClient}>
						<RouterProvider router={router} />
					</QueryClientProvider>
				</PostHogErrorBoundary>
			</PostHogProvider>
		</StrictMode>,
	);
}

/**
 * Fallback component shown when a rendering error occurs
 */
function ErrorFallback() {
	return (
		<div style={{ padding: "20px", textAlign: "center" }}>
			<h1>Something went wrong</h1>
			<p>We're sorry for the inconvenience. Please try refreshing the page.</p>
		</div>
	);
}
