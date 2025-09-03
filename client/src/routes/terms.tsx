import { createFileRoute } from "@tanstack/react-router";
import { FileText, Shield, Users, Gavel } from "lucide-react";
import { Button } from "../components/ui/button";
import { LegalPageLayout } from "../components/legal-page-layout";

export const Route = createFileRoute("/terms")({
	component: TermsOfServicePage,
});

function TermsOfServicePage() {
	return (
		<LegalPageLayout
			title="Terms of Service"
			icon={FileText}
			backButtonTestId="terms-back-button"
		>
					{/* Introduction */}
					<section className="mb-8" data-testid="terms-introduction">
						<p className="text-sm text-muted-foreground mb-6">
							By using Kassaklap, you agree to these terms. Please read them carefully
							as they contain important information about your rights and obligations.
						</p>

						<div className="text-sm text-muted-foreground mb-6 space-y-1">
							<p><strong>Effective Date:</strong> September 2025</p>
							<p><strong>Last Updated:</strong> September 2025</p>
						</div>
					</section>

					{/* Agreement */}
					<section className="mb-8" data-testid="terms-agreement">
						<h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>

						<p className="text-sm mb-3">
							By accessing or using Kassaklap (the "Service"), you agree to be bound by these
							Terms of Service ("Terms"). If you disagree with any part of these terms, then
							you may not access the Service.
						</p>
						<p className="text-sm">
							<strong>Important:</strong> These terms constitute a legally binding agreement
							between you and Kassaklap.
						</p>
					</section>

					{/* Service Description */}
					<section className="mb-8" data-testid="terms-service-description">
						<h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>

						<div className="space-y-6">
							<div>
								<h3 className="text-lg font-semibold mb-2">What Kassaklap Does</h3>
								<ul className="list-disc list-inside space-y-1 text-sm">
									<li>Provides product search and price comparison across multiple retailers</li>
									<li>Aggregates publicly available product information</li>
									<li>Displays product prices, availability, and retailer information</li>
									<li>Redirects users to retailer websites for purchases</li>
								</ul>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-2">What Kassaklap Does NOT Do</h3>
								<ul className="list-disc list-inside space-y-1 text-sm">
									<li>Sell products directly to consumers</li>
									<li>Process payments or handle transactions</li>
									<li>Store or ship physical products</li>
									<li>Provide customer service for retailer purchases</li>
								</ul>
							</div>
						</div>
					</section>

					{/* User Responsibilities */}
					<section className="mb-8" data-testid="terms-user-responsibilities">
						<h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
							<Users className="w-6 h-6 text-primary" />
							3. User Responsibilities
						</h2>

						<div className="space-y-6">
							<div>
								<h3 className="text-lg font-semibold mb-2">
									Acceptable Use
								</h3>
								<ul className="list-disc list-inside space-y-1 text-sm">
									<li>Use the Service for legitimate product search purposes</li>
									<li>Provide accurate information when interacting with the Service</li>
									<li>Respect intellectual property rights</li>
									<li>Comply with all applicable laws and regulations</li>
								</ul>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-2">
									Prohibited Activities
								</h3>
								<ul className="list-disc list-inside space-y-1 text-sm">
									<li>Attempting to scrape, crawl, or automatically extract data</li>
									<li>Using the Service for any illegal or unauthorized purpose</li>
									<li>Interfering with or disrupting the Service or servers</li>
									<li>Transmitting viruses, malware, or other harmful code</li>
									<li>Impersonating others or providing false information</li>
									<li>Using automated tools to access the Service excessively</li>
								</ul>
							</div>
						</div>
					</section>

					{/* Third Party Services */}
					<section className="mb-8" data-testid="terms-third-party">
						<h2 className="text-2xl font-bold mb-4">4. Third-Party Services & Retailers</h2>

						<h3 className="font-semibold mb-3">
							Independent Retailers
						</h3>
						<p className="text-sm mb-3">
							Kassaklap displays information from independent retailers. When you click on a
							product link, you'll be redirected to the retailer's website.
						</p>
						<ul className="list-disc list-inside space-y-1 text-sm">
							<li>Each retailer has their own terms of service and privacy policy</li>
							<li>Kassaklap is not responsible for retailer policies or practices</li>
							<li>Product availability, pricing, and shipping are controlled by retailers</li>
							<li>Customer service for purchases must be handled by the respective retailer</li>
							<li>Returns, refunds, and warranties are subject to retailer policies</li>
						</ul>
					</section>

					{/* Accuracy Disclaimer */}
					<section className="mb-8" data-testid="terms-accuracy">
						<h2 className="text-2xl font-bold mb-4">5. Information Accuracy</h2>

						<h3 className="font-semibold mb-2">
							Information Disclaimer
						</h3>
						<p className="text-sm mb-3">
							While we strive to provide accurate and up-to-date information, we cannot
							guarantee the accuracy of product details, prices, or availability.
						</p>
						<ul className="list-disc list-inside space-y-1 text-sm">
							<li>Prices and availability may change without notice</li>
							<li>Product descriptions are provided by retailers and may vary</li>
							<li>Always verify information on the retailer's website before purchasing</li>
							<li>Images may not represent the exact product variation</li>
						</ul>
					</section>

					{/* Privacy */}
					<section className="mb-8" data-testid="terms-privacy">
						<h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
							<Shield className="w-6 h-6 text-primary" />
							6. Privacy & Data
						</h2>

						<p className="text-sm mb-3">
							Your privacy is important to us. Our Privacy Policy explains how we collect,
							use, and protect your information.
						</p>
						<ul className="list-disc list-inside space-y-1 text-sm">
							<li>We collect minimal personal information necessary for the Service</li>
							<li>Analytics data helps us improve search functionality</li>
							<li>You can control cookie preferences through our cookie banner</li>
							<li>We do not sell personal information to third parties</li>
						</ul>
						<div className="mt-3">
							<Button
								variant="outline"
								size="sm"
								onClick={() => window.open('/privacy-policy', '_blank')}
								data-testid="terms-privacy-policy-link"
							>
								Read Full Privacy Policy
							</Button>
						</div>
					</section>

					{/* Liability */}
					<section className="mb-8" data-testid="terms-liability">
						<h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
							<Gavel className="w-6 h-6 text-primary" />
							7. Limitation of Liability
						</h2>

						<p className="text-sm mb-3 font-medium">
							To the maximum extent permitted by law:
						</p>
						<ul className="list-disc list-inside space-y-2 text-sm">
							<li>
								<strong>Service Availability:</strong> We provide the Service "as is" without
								warranties of any kind
							</li>
							<li>
								<strong>Third-Party Issues:</strong> We are not liable for problems with
								retailer websites, products, or services
							</li>
							<li>
								<strong>Data Accuracy:</strong> We are not responsible for inaccurate product
								information or pricing errors
							</li>
							<li>
								<strong>Damages:</strong> Our liability is limited to the amount you paid to
								use our Service (which is currently $0)
							</li>
						</ul>
					</section>

					{/* Termination */}
					<section className="mb-8" data-testid="terms-termination">
						<h2 className="text-2xl font-bold mb-4">8. Termination</h2>

						<div className="space-y-6">
							<div>
								<h3 className="text-lg font-semibold mb-2">Your Rights</h3>
								<p className="text-sm">
									You may stop using the Service at any time. No account deletion is necessary
									as we don't require user accounts for basic functionality.
								</p>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-2">Our Rights</h3>
								<p className="text-sm mb-2">
									We may terminate or suspend access to our Service immediately, without prior
									notice, for conduct that we believe:
								</p>
								<ul className="list-disc list-inside space-y-1 text-sm">
									<li>Violates these Terms of Service</li>
									<li>Is harmful to other users or our Service</li>
									<li>Violates applicable laws or regulations</li>
								</ul>
							</div>
						</div>
					</section>

					{/* Changes */}
					<section className="mb-8" data-testid="terms-changes">
						<h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>

						<p className="text-sm mb-3">
							We reserve the right to modify these terms at any time. When we do:
						</p>
						<ul className="list-disc list-inside space-y-1 text-sm">
							<li>We'll update the "Last Updated" date at the top of this page</li>
							<li>Significant changes will be communicated through our website</li>
							<li>Continued use of the Service constitutes acceptance of new terms</li>
							<li>If you disagree with changes, you should stop using the Service</li>
						</ul>
					</section>

					{/* Governing Law */}
					<section className="mb-8" data-testid="terms-governing-law">
						<h2 className="text-2xl font-bold mb-4">10. Governing Law</h2>

						<p className="text-sm">
							These Terms are governed by and construed in accordance with the laws of the
							jurisdiction where Kassaklap operates, without regard to conflict of law principles.
							Any disputes arising from these terms or the Service will be resolved through
							binding arbitration or in the courts of that jurisdiction.
						</p>
					</section>

					{/* Contact */}
					<section className="mb-8" data-testid="terms-contact">
						<h2 className="text-2xl font-bold mb-4">11. Contact Information</h2>

						<p className="text-sm mb-3">
							If you have questions about these Terms of Service:
						</p>
						<div className="space-y-1 text-sm">
							<p><strong>Email:</strong> legal@kassaklap.com</p>
							<p><strong>Subject Line:</strong> "Terms of Service Inquiry"</p>
							<p><strong>Response Time:</strong> We aim to respond within 5 business days</p>
						</div>
					</section>

					{/* Footer Actions */}
					<section className="border-t pt-6" data-testid="terms-actions">
						<div className="flex flex-wrap gap-3">
							<Button
								variant="outline"
								size="sm"
								onClick={() => window.open('/privacy-policy', '_blank')}
								data-testid="terms-privacy-link"
							>
								<Shield className="w-4 h-4 mr-2" />
								Privacy Policy
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => window.open('mailto:legal@kassaklap.com?subject=Terms of Service Inquiry', '_blank')}
								data-testid="terms-contact-email"
							>
								<FileText className="w-4 h-4 mr-2" />
								Contact Legal Team
							</Button>
						</div>
					</section>
		</LegalPageLayout>
	);
}

export default TermsOfServicePage;
