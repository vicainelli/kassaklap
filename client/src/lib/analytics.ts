import { usePostHog } from "posthog-js/react";
import { useCookieConsent } from "./cookie-consent";

export interface TrackingEvent {
	eventName: string;
	properties?: Record<string, any>;
	isEssential?: boolean;
}

/**
 * Hook for conditionally tracking events based on user consent
 */
export function useConditionalTracking() {
	const posthog = usePostHog();
	const { consent } = useCookieConsent();

	const track = ({ eventName, properties = {}, isEssential = false }: TrackingEvent) => {
		// Always allow essential events regardless of consent
		if (isEssential) {
			posthog?.capture(eventName, properties);
			return;
		}

		// Only track non-essential events if user has given consent
		if (consent === "all") {
			posthog?.capture(eventName, properties);
		}
	};

	const identify = (userId: string, properties?: Record<string, any>) => {
		// Only identify users if they've consented to tracking
		if (consent === "all") {
			posthog?.identify(userId, properties);
		}
	};

	const setPersonProperties = (properties: Record<string, any>) => {
		// Only set person properties if user has consented
		if (consent === "all") {
			posthog?.people.set(properties);
		}
	};

	const alias = (alias: string) => {
		// Only create aliases if user has consented
		if (consent === "all") {
			posthog?.alias(alias);
		}
	};

	return {
		track,
		identify,
		setPersonProperties,
		alias,
		hasConsent: consent === "all",
		hasEssentialConsent: consent !== "none",
	};
}

/**
 * Essential events that should be tracked regardless of consent
 * These are typically error events or core functionality metrics
 */
export const ESSENTIAL_EVENTS = {
	ERROR_OCCURRED: "error_occurred",
	CRITICAL_ACTION: "critical_action",
	SECURITY_EVENT: "security_event",
} as const;

/**
 * Non-essential events that require user consent
 */
export const TRACKING_EVENTS = {
	SEARCH_PRODUCT: "search_product",
	VIEW_PRODUCT: "view_product",
	PAGE_VIEW: "page_view",
	BUTTON_CLICK: "button_click",
	FORM_SUBMIT: "form_submit",
	FEATURE_USED: "feature_used",
} as const;

/**
 * Utility function for tracking page views
 */
export function trackPageView(path: string, title?: string) {
	const posthog = (window as any).posthog;
	const consent = localStorage.getItem("cookie-consent");

	if (consent === "all" && posthog) {
		posthog.capture("$pageview", {
			$current_url: window.location.href,
			$pathname: path,
			$title: title || document.title,
		});
	}
}

/**
 * Utility function for tracking essential errors
 */
export function trackError(error: Error, context?: Record<string, any>) {
	const posthog = (window as any).posthog;
	
	if (posthog) {
		posthog.capture(ESSENTIAL_EVENTS.ERROR_OCCURRED, {
			error_message: error.message,
			error_stack: error.stack,
			error_name: error.name,
			...context,
		});
	}
}