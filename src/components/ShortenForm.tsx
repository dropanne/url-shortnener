"use client";

import { createShortLink } from "@/actions/formSubmit";
import { Heading } from "@/components/Heading";
import { ShareButton } from "@/components/ShareButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Copy } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export const ShortenForm = () => {
	const [slug, setSlug] = useState<string>("");
	const [url, setUrl] = useState<string>("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { slug } = await createShortLink({ url });
		setSlug(slug);
		setUrl("");
	};

	const handleClick = () => {
		navigator.clipboard.writeText(
			`${process.env.NEXT_PUBLIC_APP_URL}/${slug}`
		);
		toast.success("Copied shortened url to clipboard!");
	};

	return (
		<div className="flex-1 flex flex-col w-full p-4 gap-10 items-center justify-center">
			<Heading>URL Shortener</Heading>
			<form
				onSubmit={handleSubmit}
				onKeyDown={(e) => {
					if (e.key === "Enter") e.preventDefault();
					if (e.ctrlKey && e.key === "Enter") handleSubmit(e);
				}}
				className="flex flex-col md:flex-row gap-4 w-full max-w-xl p-4 items-center justify-center"
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
				<div className="flex flex-col md:flex-row w-full items-center justify-center gap-2">
					<Link
						href={"/" + slug}
						className="max-w-3xl md:max-w-xl text-center line-clamp-1 truncate font-medium hover:underline underline-offset-4 cursor-pointer"
					>
						{process.env.NEXT_PUBLIC_APP_URL}/{slug}
					</Link>
					<div className="flex gap-2 items-center justify-center">
						<Button
							variant="ghost"
							size="icon"
							className="cursor-copy"
							onClick={handleClick}
						>
							<Copy className="size-4" />
						</Button>

						<ShareButton
							title="Short URL"
							text="A shortened, shareable URL."
							url={`${process.env.NEXT_PUBLIC_APP_URL}/${slug}`}
						/>
					</div>
				</div>
			) : null}
		</div>
	);
};
