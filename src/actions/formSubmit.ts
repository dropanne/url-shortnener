"use server";

import { db } from "@/lib/db";

export const createShortLink = async ({ url }: { url: string }) => {
	const shortLink = await db.redirectLinks.create({
		data: {
			url,
		},
	});

	return shortLink;
};
