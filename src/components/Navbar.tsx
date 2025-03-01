import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";

export const Navbar = () => {
	return (
		<nav className="sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 dark:border-gray-700 bg-background/80 backdrop-blur-lg transition-all">
			<MaxWidthWrapper>
				<div className="flex h-16 items-center justify-between">
					<div className="h-full flex items-center space-x-4">
						<Link
							href="/"
							className="flex z-40 font-semibold text-xl"
						>
							URL
							<span className="ml-2 text-orange-400">
								Shortener
							</span>
						</Link>
					</div>

					<div className="h-full flex items-center space-x-4">
						<ThemeToggle />
					</div>
				</div>
			</MaxWidthWrapper>
		</nav>
	);
};
