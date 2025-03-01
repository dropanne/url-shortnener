"use client";

import { createShortLink } from "@/actions/formSubmit";
import { Heading } from "@/components/Heading";
import { Button, buttonVariants } from "@/components/ui/button";
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
		<div className="flex-1 flex flex-col gap-10 items-center justify-center">
			<Heading>URL Shortener</Heading>
			<form
				onSubmit={handleSubmit}
				onKeyDown={(e) => {
					if (e.key === "Enter") e.preventDefault();
					if (e.ctrlKey && e.key === "Enter") handleSubmit(e);
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
				<div className="flex items-center justify-center gap-2">
					<Link
						href={"/" + slug}
						className={buttonVariants({
							variant: "link",
							className: "text-lg",
						})}
					>
						{process.env.NEXT_PUBLIC_APP_URL}/{slug}
					</Link>
					<Button
						variant="ghost"
						size="icon"
						className="cursor-copy"
						onClick={handleClick}
					>
						<Copy className="size-4" />
					</Button>
				</div>
			) : null}
		</div>
	);
};
