import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { ShortenForm } from "@/components/ShortenForm";

export default function Home() {
	return (
		<section id="HomePage" className="flex flex-1 w-full pt-4 pb-4">
			<MaxWidthWrapper>
				<div className="h-full flex flex-col items-center justify-center gap-4">
					<div className="flex flex-col flex-1 p-4 bg-accent/20 w-full gap-10 rounded-lg items-center justify-center m-20">
						<ShortenForm />
					</div>
				</div>
			</MaxWidthWrapper>
		</section>
	);
}
