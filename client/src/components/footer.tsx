
import { Cookie } from "lucide-react";
import { Button } from "./ui/button";
import { CookieSettings } from "./cookie-settings";
import { useCookieSettings } from "@/lib/use-cookie-settings";

export function Footer() {
	const { isOpen, openSettings, closeSettings } = useCookieSettings();

	return (
		<>
			<footer className="border-t bg-background/95 backdrop-blur-sm" data-testid="footer">
				<div className="container mx-auto px-4 py-6">
					<div className="flex flex-col md:flex-row items-center justify-between gap-4">
						<div className="flex items-center gap-2">
							<p className="text-sm text-muted-foreground">
								© 2025 Kassaklap. All rights reserved.
							</p>
						</div>
						
						<div className="flex items-center gap-4">
							<Button
								variant="ghost"
								size="sm"
								onClick={openSettings}
								className="h-8 text-xs"
								data-testid="footer-cookie-settings-button"
							>
								<Cookie className="w-3 h-3 mr-1" />
								Cookie Settings
							</Button>
							
							<a
								href="/privacy-policy"
								className="text-xs text-muted-foreground hover:text-primary transition-colors"
								data-testid="footer-privacy-policy-link"
							>
								Privacy Policy
							</a>
							
							<a
								href="/terms"
								className="text-xs text-muted-foreground hover:text-primary transition-colors"
								data-testid="footer-terms-link"
			>
								Terms of Service
							</a>
						</div>
					</div>
				</div>
			</footer>

			<CookieSettings isOpen={isOpen} onClose={closeSettings} />
		</>
	);
}

export default Footer;