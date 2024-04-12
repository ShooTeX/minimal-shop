import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { Cart } from "./api/route";
import { revalidateTag } from "next/cache";

const apiUrl = process.env.NEXT_PUBLIC_VERCEL_ENV
	? "https://minimal-shop-git-api-eriks-projects-8112f594.vercel.app/api"
	: "http://localhost:3000/api";

export default async function Home() {
	const cart = await fetch(apiUrl, {
		next: { tags: ["cart"] },
		cache: "no-store",
	}).then((res) => res.json());

	async function addToCart() {
		"use server";

		await fetch(apiUrl, {
			method: "POST",
			body: JSON.stringify({ name: "bottle" } satisfies Cart[0]),
		}).then((res) => res.json());

		revalidateTag("cart");
	}

	return (
		<>
			<nav className="border-b p-4 flex justify-end">
				<div className="font-mono p-1 border rounded h-8 w-8 text-center">
					{cart.length}
				</div>
			</nav>
			<main className="flex min-h-screen flex-col items-center justify-between p-24">
				<div className="flex">
					<div className="h-52 w-52 object-contain relative border rounded flex-shrink-0">
						<Image
							className="object-cover"
							fill
							src="https://images.ctfassets.net/x1178tp27tgt/17XRIX7R1K9KRYPgohDXQD/b389f2dd8c5a9c4b178e2d2d96a21c27/Bottle_Lavender_600ml_Isolated_PNG_4000x4000.png"
							alt="bottle"
						/>
					</div>
					<div className="ml-4 max-w-md">
						<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
							A boa o woa
						</h1>
						<p className="leading-7 [&:not(:first-child)]:mt-6 text-slate-600">
							Lorem ipsum dolor sit amet, officia excepteur ex fugiat
							reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
							ex esse exercitation amet.
						</p>
						<form action={addToCart}>
							<Button type="submit" className="mt-4">
								BUY ME!
							</Button>
						</form>
					</div>
				</div>
			</main>
		</>
	);
}
