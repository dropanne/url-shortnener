import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { RWebShare } from "react-web-share";

export const ShareButton = ({
	title,
	text,
	url,
}: {
	title: string;
	text: string;
	url: string;
}) => {
	return (
		<RWebShare
			data={{
				title,
				text,
				url,
			}}
		>
			<Button variant="ghost" size="icon">
				<Share className="size-4" />
				<span className="block md:hidden ml-2">Share</span>
			</Button>
		</RWebShare>
	);
};
