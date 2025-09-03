import { useState, useEffect } from "react";
import { Cookie, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useCookieConsent } from "@/lib/cookie-consent";
import { cn } from "@/lib/utils";

const STATUS_SHOWN_KEY = "cookie-status-shown";

export function CookieStatus() {
	const { consent } = useCookieConsent();
	const [isVisible, setIsVisible] = useState(false);
	const [shouldRender, setShouldRender] = useState(false);

	// Check if status should be shown for this consent choice
	useEffect(() => {
		if (consent === null) {
			return;
		}

		const statusShownData = localStorage.getItem(STATUS_SHOWN_KEY);
		const shownChoices = statusShownData ? JSON.parse(statusShownData) : {};
		
		// Only show if this specific consent choice hasn't been shown before
		if (!shownChoices[consent]) {
			setIsVisible(true);
			setShouldRender(true);
			
			// Mark this consent choice as shown
			shownChoices[consent] = true;
			localStorage.setItem(STATUS_SHOWN_KEY, JSON.stringify(shownChoices));

			// Auto-hide ALL status messages after 3 seconds
			const hideTimer = setTimeout(() => {
				setIsVisible(false);
			}, 3000);

			const removeTimer = setTimeout(() => {
				setShouldRender(false);
			}, 3500); // 500ms after fade starts

			return () => {
				clearTimeout(hideTimer);
				clearTimeout(removeTimer);
			};
		}
	}, [consent]);

	if (consent === null || !shouldRender) {
		return null; // Don't show anything if no choice has been made or if hidden
	}

	const getStatusConfig = () => {
		switch (consent) {
			case "all":
				return {
					icon: CheckCircle,
					text: "All cookies accepted",
					bgColor: "bg-green-50 dark:bg-green-950",
					textColor: "text-green-800 dark:text-green-200",
					iconColor: "text-green-600 dark:text-green-400",
					borderColor: "border-green-200 dark:border-green-800",
				};
			case "essential":
				return {
					icon: AlertCircle,
					text: "Essential cookies only",
					bgColor: "bg-yellow-50 dark:bg-yellow-950",
					textColor: "text-yellow-800 dark:text-yellow-200",
					iconColor: "text-yellow-600 dark:text-yellow-400",
					borderColor: "border-yellow-200 dark:border-yellow-800",
				};
			case "none":
				return {
					icon: XCircle,
					text: "All cookies rejected",
					bgColor: "bg-red-50 dark:bg-red-950",
					textColor: "text-red-800 dark:text-red-200",
					iconColor: "text-red-600 dark:text-red-400",
					borderColor: "border-red-200 dark:border-red-800",
				};
			default:
				return null;
		}
	};

	const config = getStatusConfig();
	if (!config) return null;

	const { icon: Icon, text, bgColor, textColor, iconColor, borderColor } = config;

	return (
		<div className={cn(
			"fixed top-4 right-4 z-40 flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all duration-500 shadow-sm",
			bgColor,
			textColor,
			borderColor,
			!isVisible ? "opacity-0 translate-x-2" : "opacity-100 translate-x-0"
		)} data-testid={`cookie-status-${consent}`}>
			<Cookie className={cn("w-3 h-3", iconColor)} />
			<Icon className={cn("w-3 h-3", iconColor)} />
			<span data-testid={`cookie-status-message-${consent}`}>{text}</span>
		</div>
	);
}

export default CookieStatus;