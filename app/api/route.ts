import { JSONFilePreset } from "lowdb/node";

type CartItem = {
	name: string;
};

export type Cart = CartItem[];

const defaultCart = { cart: [] };

// export const dynamic = "force-dynamic";

export async function GET() {
	const db = await JSONFilePreset<{ cart: Cart }>("db.json", defaultCart);
	return Response.json(db.data.cart);
}

export async function POST(req: Request) {
	const body = await req.json();
	const db = await JSONFilePreset<{ cart: Cart }>("db.json", defaultCart);

	db.update(({ cart }) => {
		if (!body) {
			return;
		}

		cart.push(body);
	});
	return Response.json({ success: true });
}
