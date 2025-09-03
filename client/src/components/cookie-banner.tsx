
import { Cookie } from "lucide-react";
import { Button } from "./ui/button";
import { useCookieConsent } from "@/lib/cookie-consent";

export function CookieBanner() {
	const { consent, setConsent, hasShownBanner } = useCookieConsent();

	// Don't show banner if user has already made a choice or if it was explicitly hidden
	if (consent !== null || hasShownBanner) {
		return null;
	}

	const handleAcceptAll = () => {
		setConsent("all");
	};

	const handleRejectNonEssential = () => {
		setConsent("essential");
	};

	const handleRejectAll = () => {
		setConsent("none");
	};

	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t shadow-lg animate-in slide-in-from-bottom-2 duration-300" data-testid="cookie-banner">
			<div className="container mx-auto p-4 max-w-7xl">
				<div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
					{/* Icon and Content */}
					<div className="flex items-start gap-3 flex-1">
						<Cookie className="w-5 h-5 mt-0.5 text-primary shrink-0" />
						<div className="flex-1 space-y-2">
							<h3 className="font-semibold text-sm" data-testid="cookie-banner-title">We use cookies</h3>
							<p className="text-sm text-muted-foreground leading-relaxed" data-testid="cookie-banner-description">
								We use cookies to enhance your browsing experience, analyze site traffic, and provide personalized content.
								You can choose which cookies to accept or reject all non-essential cookies.
							</p>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
						<Button
							variant="outline"
							size="sm"
							onClick={handleRejectAll}
							className="w-full sm:w-auto"
							data-testid="cookie-banner-reject-all"
						>
							Reject All
						</Button>
						<Button
							variant="secondary"
							size="sm"
							onClick={handleRejectNonEssential}
							className="w-full sm:w-auto"
							data-testid="cookie-banner-essential-only"
						>
							Essential Only
						</Button>
						<Button
							size="sm"
							onClick={handleAcceptAll}
							className="w-full sm:w-auto"
							data-testid="cookie-banner-accept-all"
						>
							Accept All
						</Button>
					</div>
				</div>

				{/* Privacy Policy Link */}
				<div className="mt-3 pt-3 border-t" data-testid="cookie-banner-privacy-info">
					<p className="text-xs text-muted-foreground">
						By continuing to use our site, you agree to our use of essential cookies.
						For more information about our cookie policy and how we handle your data,
						please see our{" "}
						<a
							href="/privacy-policy"
							className="text-primary hover:underline font-medium"
							data-testid="cookie-banner-privacy-link"
						>
							Privacy Policy
						</a>
						.
					</p>
				</div>
			</div>
		</div>
	);
}

export default CookieBanner;
