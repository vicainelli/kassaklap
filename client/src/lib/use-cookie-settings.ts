import { useState } from "react";

export function useCookieSettings() {
	const [isOpen, setIsOpen] = useState(false);

	const openSettings = () => setIsOpen(true);
	const closeSettings = () => setIsOpen(false);

	return {
		isOpen,
		openSettings,
		closeSettings,
	};
}