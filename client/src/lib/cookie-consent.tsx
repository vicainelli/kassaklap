import React, { createContext, useContext, useEffect, useState } from "react";
import { usePostHog } from "posthog-js/react";

export type CookieConsentType = "all" | "essential" | "none" | null;

interface CookieConsentContextType {
	consent: CookieConsentType;
	setConsent: (consent: CookieConsentType) => void;
	hasShownBanner: boolean;
	showBanner: () => void;
	hideBanner: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const STORAGE_KEY = "cookie-consent";
const BANNER_SHOWN_KEY = "cookie-banner-shown";

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
	const [consent, setConsentState] = useState<CookieConsentType>(null);
	const [hasShownBanner, setHasShownBanner] = useState(false);
	const posthog = usePostHog();

	// Load consent from localStorage on mount
	useEffect(() => {
		const savedConsent = localStorage.getItem(STORAGE_KEY) as CookieConsentType;
		const bannerShown = localStorage.getItem(BANNER_SHOWN_KEY) === "true";
		
		if (savedConsent) {
			setConsentState(savedConsent);
		}
		
		setHasShownBanner(bannerShown);
	}, []);

	// Apply consent settings to PostHog
	useEffect(() => {
		if (!posthog || consent === null) return;

		switch (consent) {
			case "all":
				// Enable all tracking
				posthog.opt_in_capturing();
				// Enable session recordings, autocapture, etc.
				posthog.startSessionRecording();
				break;
			case "essential":
				// Disable non-essential tracking but keep essential features
				posthog.opt_out_capturing();
				// Stop session recordings and other non-essential features
				posthog.stopSessionRecording();
				// Still allow essential events like errors or core functionality
				posthog.set_config({
					disable_session_recording: true,
					autocapture: false,
					capture_pageview: false,
					disable_surveys: true,
				});
				break;
			case "none":
				// Disable all tracking completely
				posthog.opt_out_capturing();
				posthog.stopSessionRecording();
				posthog.set_config({
					disable_session_recording: true,
					autocapture: false,
					capture_pageview: false,
					disable_surveys: true,
				});
				// Clear any existing PostHog data
				posthog.reset();
				break;
		}
	}, [posthog, consent]);

	const setConsent = (newConsent: CookieConsentType) => {
		setConsentState(newConsent);
		
		if (newConsent) {
			localStorage.setItem(STORAGE_KEY, newConsent);
			localStorage.setItem(BANNER_SHOWN_KEY, "true");
			setHasShownBanner(true);
			
			// Clear status tracking so new status message can be shown
			const statusShownData = localStorage.getItem("cookie-status-shown");
			if (statusShownData) {
				const shownChoices = JSON.parse(statusShownData);
				delete shownChoices[newConsent];
				localStorage.setItem("cookie-status-shown", JSON.stringify(shownChoices));
			}
		}
	};

	const showBanner = () => {
		setHasShownBanner(false);
		localStorage.removeItem(BANNER_SHOWN_KEY);
	};

	const hideBanner = () => {
		setHasShownBanner(true);
		localStorage.setItem(BANNER_SHOWN_KEY, "true");
	};

	const value = {
		consent,
		setConsent,
		hasShownBanner,
		showBanner,
		hideBanner,
	};

	return (
		<CookieConsentContext.Provider value={value}>
			{children}
		</CookieConsentContext.Provider>
	);
}

export function useCookieConsent() {
	const context = useContext(CookieConsentContext);
	if (context === undefined) {
		throw new Error("useCookieConsent must be used within a CookieConsentProvider");
	}
	return context;
}