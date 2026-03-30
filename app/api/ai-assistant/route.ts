import { getAiAssistantEnabled } from "lib/shopify/get-ai-assistant-enabled";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
 apiKey: process.env.OPENAI_API_KEY,
 timeout: 20_000,
 maxRetries: 2,
});

type Product = {
 id?: string;
 handle?: string;
 title: string;
 description?: string;
 price?: string | number;
 currencyCode?: string;
 vendor?: string;
 productType?: string;
 tags?: string[];
 availableForSale?: boolean;
 options?: Array<{
  name: string;
  values: string[];
 }>;
};

type RequestBody = {
 message: string;
 products: Product[];
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 20;

// Simple in-memory limiter.
// Fine for a first version, but use Redis/Upstash in production if you have multiple instances.
const ipStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: NextRequest): string {
 const forwardedFor = req.headers.get("x-forwarded-for");
 if (forwardedFor) {
  return forwardedFor.split(",")[0]?.trim() || "unknown";
 }
 return "unknown";
}

function checkRateLimit(ip: string): boolean {
 const now = Date.now();
 const entry = ipStore.get(ip);

 if (!entry || now > entry.resetAt) {
  ipStore.set(ip, {
   count: 1,
   resetAt: now + RATE_LIMIT_WINDOW_MS,
  });
  return true;
 }

 if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
  return false;
 }

 entry.count += 1;
 return true;
}

function isValidProductArray(value: unknown): value is Product[] {
 if (!Array.isArray(value)) return false;

 return value.every((item) => {
  if (!item || typeof item !== "object") return false;
  const product = item as Record<string, unknown>;
  return typeof product.title === "string";
 });
}

function sanitizeProducts(products: Product[]): Product[] {
 return products.slice(0, 10).map((product) => ({
  id: product.id,
  handle: product.handle,
  title: product.title,
  description: product.description?.slice(0, 500),
  price: product.price,
  currencyCode: product.currencyCode,
  vendor: product.vendor,
  productType: product.productType,
  tags: Array.isArray(product.tags) ? product.tags.slice(0, 20) : [],
  availableForSale: product.availableForSale,
  options: Array.isArray(product.options)
   ? product.options.slice(0, 10).map((option) => ({
      name: option.name,
      values: Array.isArray(option.values) ? option.values.slice(0, 20) : [],
     }))
   : [],
 }));
}

function buildSystemPrompt(): string {
 return `
You are an ecommerce shopping assistant for this store.

Rules:
- Answer ONLY using the provided product data.
- Do NOT invent or assume any product, feature, price, availability, policy, or recommendation.
- If the answer is not clearly supported by the provided data, say: "I don't know based on the current store data."
- Keep replies concise, helpful, and suitable for ecommerce.
- Prefer direct answers over long explanations.
- When recommending products, only recommend from the provided products.
- If multiple products match, mention up to 3 best matches.
- If none match, say you don't know based on the current store data.
- Do not mention any knowledge outside the provided data.
- Do not claim to have browsed the website or checked live inventory unless explicitly present in the data.
- When recommending products, return them separately in a "products" array with "title" and "handle".
- Do not embed links in the text response.
`.trim();
}

function buildUserPrompt(message: string, products: Product[]): string {
 return `
Customer message:
${message}

Store product data (JSON):
${JSON.stringify(products, null, 2)}

Task:
Return a JSON object with:
- "reply": short helpful answer
- "products": array of recommended products with "title" and "handle"

If no products match, return an empty array.

Only use the provided product data.
`.trim();
}

export async function POST(req: NextRequest) {
 const ip = getClientIp(req);

 if (!checkRateLimit(ip)) {
  return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
 }

 const aiEnabled = await getAiAssistantEnabled();

 if (!aiEnabled) {
  return NextResponse.json({ error: "AI assistant is disabled." }, { status: 403 });
 }

 if (!process.env.OPENAI_API_KEY) {
  return NextResponse.json({ error: "Missing OPENAI_API_KEY." }, { status: 500 });
 }

 let body: RequestBody;

 try {
  body = await req.json();
 } catch {
  return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
 }

 const message = typeof body.message === "string" ? body.message.trim() : "";
 const products = body.products;

 if (!message) {
  return NextResponse.json({ error: "message is required." }, { status: 400 });
 }

 if (message.length > 1000) {
  return NextResponse.json({ error: "message is too long." }, { status: 400 });
 }

 if (!isValidProductArray(products)) {
  return NextResponse.json({ error: "products must be an array of product objects with at least a title." }, { status: 400 });
 }

 const safeProducts = sanitizeProducts(products);

 try {
  const completion = await openai.chat.completions.create({
   model: process.env.OPENAI_MODEL || "gpt-5.4-mini",
   temperature: 0.2,
   response_format: { type: "json_object" },
   messages: [
    {
     role: "system",
     content: buildSystemPrompt(),
    },
    {
     role: "user",
     content: buildUserPrompt(message, safeProducts),
    },
   ],
  });

  let parsed: { reply?: unknown; products?: unknown } = {};

  try {
   parsed = JSON.parse(completion.choices[0]?.message?.content || "{}");
  } catch {
   parsed = {
    reply: "I don't know based on the current store data.",
    products: [],
   };
  }

  const recommendedProducts = Array.isArray(parsed.products) ? parsed.products.filter((product: unknown): product is { title: string; handle: string } => !!product && typeof product === "object" && typeof (product as { title?: unknown }).title === "string" && typeof (product as { handle?: unknown }).handle === "string").slice(0, 3) : [];

  return NextResponse.json({
   reply: typeof parsed.reply === "string" && parsed.reply.trim() ? parsed.reply : "I don't know based on the current store data.",
   products: recommendedProducts,
  });
 } catch (error) {
  console.error("AI assistant error:", error);

  return NextResponse.json({ error: "Failed to generate assistant response." }, { status: 500 });
 }
}
