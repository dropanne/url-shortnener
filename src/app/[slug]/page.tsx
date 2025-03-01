import { Heading } from "@/components/Heading";
import { db } from "@/lib/db";
import { notFound, redirect, RedirectType } from "next/navigation";

const RedirectPage = async ({
	params,
}: {
	params: Promise<{ slug: string }>;
}) => {
	const { slug } = await params;

	const shortLink = await db.redirectLinks.findUnique({
		where: {
			slug,
		},
	});

	if (!shortLink) {
		return notFound();
	}

	redirect(shortLink.url, RedirectType.replace);

	return (
		<div className="flex flex-1 items-center justify-center">
			<Heading>Redirecting to {shortLink?.url}</Heading>
		</div>
	);
};

export default RedirectPage;
