import { getSearchProducts } from "lib/shopify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
 const query = req.nextUrl.searchParams.get("q")?.trim();

 if (!query) {
  return NextResponse.json([]);
 }

 const products = await getSearchProducts(query, 6);

 return NextResponse.json(products);
}
