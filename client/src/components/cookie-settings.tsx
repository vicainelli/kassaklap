import { useState } from "react";
import { Settings, Cookie, Shield, BarChart3, X } from "lucide-react";
import { Button } from "./ui/button";
import { useCookieConsent } from "@/lib/cookie-consent";
import { cn } from "@/lib/utils";

interface CookieSettingsProps {
	isOpen: boolean;
	onClose: () => void;
}

export function CookieSettings({ isOpen, onClose }: CookieSettingsProps) {
	const { consent, setConsent } = useCookieConsent();
	const [tempSettings, setTempSettings] = useState({
		essential: true, // Always enabled
		analytics: consent === "all",
		marketing: consent === "all",
	});

	if (!isOpen) return null;

	const handleSaveSettings = () => {
		if (tempSettings.analytics || tempSettings.marketing) {
			setConsent("all");
		} else {
			setConsent("essential");
		}
		onClose();
	};

	const handleAcceptAll = () => {
		setTempSettings({
			essential: true,
			analytics: true,
			marketing: true,
		});
		setConsent("all");
		onClose();
	};

	const handleRejectAll = () => {
		setTempSettings({
			essential: true,
			analytics: false,
			marketing: false,
		});
		setConsent("none");
		onClose();
	};

	return (
		<div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" data-testid="cookie-settings-overlay">
			<div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-lg border shadow-lg animate-in zoom-in-95 duration-200" data-testid="cookie-settings-modal">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b">
					<div className="flex items-center gap-2">
						<Cookie className="w-5 h-5 text-primary" />
						<h2 className="text-lg font-semibold" data-testid="cookie-settings-title">Cookie Settings</h2>
					</div>
					<Button
						variant="ghost"
						size="icon"
						onClick={onClose}
						className="h-8 w-8"
						data-testid="cookie-settings-close"
					>
						<X className="w-4 h-4" />
					</Button>
				</div>

				{/* Content */}
				<div className="p-6 space-y-6">
					<p className="text-sm text-muted-foreground" data-testid="cookie-settings-description">
						We use different types of cookies to enhance your experience on our website. 
						You can choose which categories to accept or reject. Essential cookies are 
						required for the website to function properly and cannot be disabled.
					</p>

					{/* Cookie Categories */}
					<div className="space-y-4">
						{/* Essential Cookies */}
						<div className="border rounded-lg p-4" data-testid="cookie-category-essential">
							<div className="flex items-start justify-between">
								<div className="flex items-start gap-3 flex-1">
									<Shield className="w-5 h-5 mt-0.5 text-green-600" />
									<div className="space-y-1">
										<h3 className="font-medium text-sm" data-testid="essential-cookies-title">Essential Cookies</h3>
										<p className="text-xs text-muted-foreground" data-testid="essential-cookies-description">
											These cookies are necessary for the website to function and cannot be disabled. 
											They are usually set in response to actions made by you which amount to a request 
											for services, such as setting your privacy preferences or logging in.
										</p>
									</div>
								</div>
								<div className="flex items-center gap-2 ml-4">
									<span className="text-xs text-muted-foreground" data-testid="essential-cookies-status">Always active</span>
									<div className="w-8 h-4 bg-primary rounded-full flex items-center justify-end px-0.5" data-testid="essential-cookies-toggle">
										<div className="w-3 h-3 bg-white rounded-full" />
									</div>
								</div>
							</div>
						</div>

						{/* Analytics Cookies */}
						<div className="border rounded-lg p-4" data-testid="cookie-category-analytics">
							<div className="flex items-start justify-between">
								<div className="flex items-start gap-3 flex-1">
									<BarChart3 className="w-5 h-5 mt-0.5 text-blue-600" />
									<div className="space-y-1">
										<h3 className="font-medium text-sm" data-testid="analytics-cookies-title">Analytics Cookies</h3>
										<p className="text-xs text-muted-foreground" data-testid="analytics-cookies-description">
											These cookies help us understand how visitors interact with our website by 
											collecting and reporting information anonymously. This helps us improve our 
											website and provide better user experiences.
										</p>
									</div>
								</div>
								<button
									type="button"
									onClick={() => setTempSettings(prev => ({ ...prev, analytics: !prev.analytics }))}
									className="ml-4"
									data-testid="analytics-cookies-toggle"
								>
									<div className={cn(
										"w-8 h-4 rounded-full flex items-center transition-colors duration-200",
										tempSettings.analytics ? "bg-primary justify-end" : "bg-muted justify-start"
									)}>
										<div className="w-3 h-3 bg-white rounded-full mx-0.5" />
									</div>
								</button>
							</div>
						</div>

						{/* Marketing Cookies */}
						<div className="border rounded-lg p-4" data-testid="cookie-category-marketing">
							<div className="flex items-start justify-between">
								<div className="flex items-start gap-3 flex-1">
									<Settings className="w-5 h-5 mt-0.5 text-purple-600" />
									<div className="space-y-1">
										<h3 className="font-medium text-sm" data-testid="marketing-cookies-title">Marketing Cookies</h3>
										<p className="text-xs text-muted-foreground" data-testid="marketing-cookies-description">
											These cookies are used to deliver advertisements more relevant to you and your 
											interests. They may also be used to limit the number of times you see an 
											advertisement and measure the effectiveness of advertising campaigns.
										</p>
									</div>
								</div>
								<button
									type="button"
									onClick={() => setTempSettings(prev => ({ ...prev, marketing: !prev.marketing }))}
									className="ml-4"
									data-testid="marketing-cookies-toggle"
								>
									<div className={cn(
										"w-8 h-4 rounded-full flex items-center transition-colors duration-200",
										tempSettings.marketing ? "bg-primary justify-end" : "bg-muted justify-start"
									)}>
										<div className="w-3 h-3 bg-white rounded-full mx-0.5" />
									</div>
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="border-t p-6">
					<div className="flex flex-col sm:flex-row gap-3 justify-end">
						<Button
							variant="outline"
							onClick={handleRejectAll}
							className="sm:w-auto"
							data-testid="cookie-settings-reject-all"
						>
							Reject All
						</Button>
						<Button
							variant="secondary"
							onClick={handleSaveSettings}
							className="sm:w-auto"
							data-testid="cookie-settings-save"
						>
							Save Preferences
						</Button>
						<Button
							onClick={handleAcceptAll}
							className="sm:w-auto"
							data-testid="cookie-settings-accept-all"
						>
							Accept All
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CookieSettings;