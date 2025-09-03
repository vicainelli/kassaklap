import { createFileRoute } from "@tanstack/react-router";
import { Shield, Eye, Database, Cookie, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { LegalPageLayout } from "../components/legal-page-layout";

export const Route = createFileRoute("/privacy-policy")({
	component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
	return (
		<LegalPageLayout
			title="Privacy Policy"
			icon={Shield}
			backButtonTestId="privacy-policy-back-button"
		>
					{/* Introduction */}
					<section className="mb-8" data-testid="privacy-policy-introduction">
						<p className="text-sm text-muted-foreground mb-6">
							At Kassaklap, we are committed to protecting your privacy and being transparent
							about how we collect, use, and protect your personal information.
						</p>

						<div className="text-sm text-muted-foreground mb-6 space-y-1">
							<p><strong>Last updated:</strong> September 2025</p>
							<p><strong>Contact:</strong> privacy@kassaklap.com</p>
						</div>
					</section>

					{/* What We Collect */}
					<section className="mb-8" data-testid="privacy-policy-data-collection">
						<h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
							<Database className="w-6 h-6 text-primary" />
							What Information We Collect
						</h2>

						<div className="space-y-6">
							<div className="mb-6">
								<h3 className="text-lg font-semibold mb-3">
									Information You Provide Directly
								</h3>
								<ul className="list-disc list-inside space-y-2 text-sm">
									<li>Search queries when you use our product search feature</li>
									<li>Feedback or messages you send us through contact forms</li>
									<li>Account information if you choose to create an account (email, preferences)</li>
								</ul>
							</div>

							<div className="mb-6">
								<h3 className="text-lg font-semibold mb-3">
									Information We Collect Automatically
								</h3>
								<ul className="list-disc list-inside space-y-2 text-sm">
									<li><strong>Usage Data:</strong> Pages visited, features used, time spent on site</li>
									<li><strong>Technical Data:</strong> Browser type, device information, IP address</li>
									<li><strong>Analytics Data:</strong> How you interact with our search results and features</li>
									<li><strong>Cookie Data:</strong> Preferences and settings to improve your experience</li>
								</ul>
							</div>
						</div>
					</section>

					{/* How We Use Information */}
					<section className="mb-8" data-testid="privacy-policy-data-usage">
						<h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
							<Eye className="w-6 h-6 text-primary" />
							How We Use Your Information
						</h2>

						<div className="space-y-6">
							<div>
								<h3 className="text-lg font-semibold mb-2">Essential Services</h3>
								<ul className="list-disc list-inside space-y-1 text-sm">
									<li>Provide product search and comparison functionality</li>
									<li>Display relevant search results from various retailers</li>
									<li>Maintain and improve website security</li>
									<li>Respond to your inquiries and provide customer support</li>
								</ul>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-2">Analytics & Improvement</h3>
								<ul className="list-disc list-inside space-y-1 text-sm">
									<li>Analyze usage patterns to improve our search algorithms</li>
									<li>Understand which products and retailers are most popular</li>
									<li>Identify and fix technical issues</li>
									<li>Develop new features based on user behavior</li>
								</ul>
							</div>
						</div>
					</section>

					{/* Cookie Policy */}
					<section className="mb-8" data-testid="privacy-policy-cookies">
						<h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
							<Cookie className="w-6 h-6 text-primary" />
							Cookie Policy
						</h2>

						<p className="text-sm mb-4">
							<strong>Your Choice:</strong> You can control which cookies we use through our cookie banner
							and settings. Essential cookies are required for the site to function properly.
						</p>

						<div className="space-y-6">
							<div>
								<h3 className="text-lg font-semibold mb-2">
									Essential Cookies (Always Active)
								</h3>
								<p className="text-sm mb-2">
									These cookies are necessary for the website to function and cannot be disabled.
								</p>
								<ul className="list-disc list-inside space-y-1 text-sm">
									<li>User preference settings (theme, language)</li>
									<li>Security and authentication</li>
									<li>Cookie consent choices</li>
									<li>Basic functionality (search, navigation)</li>
								</ul>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-2">
									Analytics Cookies (Optional)
								</h3>
								<p className="text-sm mb-2">
									These help us understand how visitors use our website.
								</p>
								<ul className="list-disc list-inside space-y-1 text-sm">
									<li>PostHog analytics for usage patterns</li>
									<li>Page view tracking</li>
									<li>Feature usage statistics</li>
									<li>Performance monitoring</li>
								</ul>
							</div>
						</div>
					</section>

					{/* Data Sharing */}
					<section className="mb-8" data-testid="privacy-policy-data-sharing">
						<h2 className="text-2xl font-bold mb-4">Data Sharing & Third Parties</h2>

						<div className="space-y-6">
							<div>
								<h3 className="text-lg font-semibold mb-2">
									We DO NOT Sell Your Data
								</h3>
								<p className="text-sm">
									We never sell, rent, or trade your personal information to third parties for
									marketing purposes.
								</p>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-2">Limited Sharing</h3>
								<p className="text-sm mb-2">We may share data only in these specific cases:</p>
								<ul className="list-disc list-inside space-y-1 text-sm">
									<li><strong>Service Providers:</strong> Analytics services (PostHog) to improve our platform</li>
									<li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
									<li><strong>Business Transfer:</strong> In case of merger or acquisition (with notice)</li>
									<li><strong>Retailer Integration:</strong> Anonymous search data to fetch product information</li>
								</ul>
							</div>
						</div>
					</section>

					{/* Your Rights */}
					<section className="mb-8" data-testid="privacy-policy-user-rights">
						<h2 className="text-2xl font-bold mb-4">Your Privacy Rights</h2>

						<div className="space-y-6">
							<div>
								<h3 className="text-lg font-semibold mb-2">Cookie Control</h3>
								<ul className="list-disc list-inside space-y-1 text-sm">
									<li>Accept or reject non-essential cookies</li>
									<li>Change your cookie preferences at any time</li>
									<li>Clear browser data to reset all tracking</li>
								</ul>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-2">Data Rights (GDPR/CCPA)</h3>
								<ul className="list-disc list-inside space-y-1 text-sm">
									<li><strong>Access:</strong> Request a copy of your personal data</li>
									<li><strong>Rectification:</strong> Correct inaccurate personal data</li>
									<li><strong>Erasure:</strong> Request deletion of your personal data</li>
									<li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
									<li><strong>Object:</strong> Object to processing of your personal data</li>
								</ul>
							</div>
						</div>
					</section>

					{/* Data Security */}
					<section className="mb-8" data-testid="privacy-policy-security">
						<h2 className="text-2xl font-bold mb-4">Data Security</h2>

						<p className="text-sm mb-3">
							We implement appropriate technical and organizational measures to protect your
							personal information:
						</p>
						<ul className="list-disc list-inside space-y-1 text-sm">
							<li>HTTPS encryption for all data transmission</li>
							<li>Secure cloud infrastructure with access controls</li>
							<li>Regular security audits and updates</li>
							<li>Limited access to personal data on a need-to-know basis</li>
							<li>Data retention policies to minimize stored information</li>
						</ul>
					</section>

					{/* Contact */}
					<section className="mb-8" data-testid="privacy-policy-contact">
						<h2 className="text-2xl font-bold mb-4">Contact Us</h2>

						<p className="text-sm mb-3">
							If you have questions about this privacy policy or your personal data:
						</p>
						<div className="space-y-2 text-sm">
							<p><strong>Email:</strong> privacy@kassaklap.com</p>
							<p><strong>Subject Line:</strong> "Privacy Policy Inquiry"</p>
							<p><strong>Response Time:</strong> We aim to respond within 72 hours</p>
						</div>
					</section>

					{/* Updates */}
					<section className="mb-8" data-testid="privacy-policy-updates">
						<h2 className="text-2xl font-bold mb-4">Policy Updates</h2>

						<p className="text-sm mb-2">
							We may update this privacy policy from time to time. When we do:
						</p>
						<ul className="list-disc list-inside space-y-1 text-sm">
							<li>We'll update the "Last updated" date at the top</li>
							<li>Significant changes will be highlighted in our cookie banner</li>
							<li>You can always find the latest version at this URL</li>
							<li>Continued use of our service means you accept the updated policy</li>
						</ul>
					</section>

					{/* Footer Actions */}
					<section className="border-t pt-6" data-testid="privacy-policy-actions">
						<div className="flex flex-wrap gap-3">
							<Button
								variant="outline"
								size="sm"
								onClick={() => {
									const footer = document.querySelector('[data-testid="footer-cookie-settings-button"]') as HTMLElement;
									footer?.click();
								}}
								data-testid="privacy-policy-cookie-settings"
							>
								<Cookie className="w-4 h-4 mr-2" />
								Manage Cookie Preferences
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => window.open('mailto:privacy@kassaklap.com?subject=Privacy Policy Inquiry', '_blank')}
								data-testid="privacy-policy-contact-email"
							>
								<Mail className="w-4 h-4 mr-2" />
								Contact Privacy Team
							</Button>
						</div>
					</section>
		</LegalPageLayout>
	);
}

export default PrivacyPolicyPage;
