import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

interface LegalPageLayoutProps {
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	backButtonTestId: string;
	children: React.ReactNode;
}

export function LegalPageLayout({ title, icon: Icon, backButtonTestId, children }: LegalPageLayoutProps) {
	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center gap-4">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => window.history.back()}
							className="gap-2"
							data-testid={backButtonTestId}
						>
							<ArrowLeft className="w-4 h-4" />
							Back
						</Button>
						<div className="flex items-center gap-2">
							<Icon className="w-5 h-5 text-primary" />
							<h1 className="text-xl font-semibold">{title}</h1>
						</div>
					</div>
				</div>
			</header>

			{/* Content */}
			<main className="container mx-auto px-4 py-8 max-w-4xl">
				<div className="prose prose-slate dark:prose-invert max-w-none">
					{children}
				</div>
			</main>
		</div>
	);
}

export default LegalPageLayout;