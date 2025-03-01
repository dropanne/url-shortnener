"use client";

import { createShortLink } from "@/actions/formSubmit";
import { Heading } from "@/components/Heading";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const ShortenForm = () => {
	const [slug, setSlug] = useState<string>("");
	const [url, setUrl] = useState<string>("");

	const handleSubmit = async () => {
		const { slug } = await createShortLink({ url });
		setSlug(slug);
		setUrl("");
	};

	return (
		<div className="flex-1 flex flex-col gap-10 items-center justify-center">
			<Heading>URL Shortener</Heading>
			<form
				onSubmit={handleSubmit}
				onKeyDown={(e) => {
					if (e.key === "Enter" && !e.ctrlKey) e.preventDefault();
					if (e.ctrlKey && e.key === "Enter") handleSubmit();
				}}
				className="flex gap-4 min-w-xl items-center justify-center"
			>
				<Input
					id="url"
					type="url"
					placeholder="https://example.com"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
				/>
				<Button>
					Submit <ArrowRight className="size-4" />
				</Button>
			</form>

			{slug ? (
				<Link
					href={"/" + slug}
					className={buttonVariants({
						variant: "link",
						className: "text-lg",
					})}
				>
					{process.env.NEXT_PUBLIC_APP_URL}/{slug}
				</Link>
			) : null}
		</div>
	);
};
