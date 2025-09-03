import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { CookieConsentProvider } from "@/lib/cookie-consent";
import { CookieBanner } from "@/components/cookie-banner";
import { Footer } from "@/components/footer";
import { CookieStatus } from "@/components/cookie-status";

export const Route = createRootRoute({
	component: () => (
		<CookieConsentProvider>
			<div className="min-h-screen flex flex-col">
				<main className="flex-1">
					<Outlet />
				</main>
				<Footer />
			</div>
			<CookieBanner />
			<CookieStatus />
			<TanStackRouterDevtools />
		</CookieConsentProvider>
	),
});
