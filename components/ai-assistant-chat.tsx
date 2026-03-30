"use client";

import { useState } from "react";

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

type Props = {
 products: Product[];
};

type ChatMessage = {
 role: "user" | "assistant";
 content: string;
};

export function AIAssistantChat({ products }: Props) {
 const [input, setInput] = useState("");
 const [loading, setLoading] = useState(false);
 const [messages, setMessages] = useState<ChatMessage[]>([
  {
   role: "assistant",
   content: "Hi — ask me about products in this store.",
  },
 ]);

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  const message = input.trim();
  if (!message || loading) return;

  setMessages((prev) => [...prev, { role: "user", content: message }]);
  setInput("");
  setLoading(true);

  try {
   const res = await fetch("/api/ai-assistant", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({
     message,
     products,
    }),
   });

   const data = await res.json();

   if (!res.ok) {
    throw new Error(data?.error || "Something went wrong.");
   }

   setMessages((prev) => [
    ...prev,
    {
     role: "assistant",
     content: data.reply || "I don't know based on the current store data.",
    },
   ]);
  } catch (error) {
   const message = error instanceof Error ? error.message : "Something went wrong.";

   setMessages((prev) => [
    ...prev,
    {
     role: "assistant",
     content: `Error: ${message}`,
    },
   ]);
  } finally {
   setLoading(false);
  }
 }

 return (
  <div className="mx-auto w-full max-w-xl rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
   <div className="mb-4">
    <h2 className="text-lg font-semibold">Shopping Assistant</h2>
    <p className="text-sm text-neutral-500">Answers are limited to your store product data.</p>
   </div>

   <div className="mb-4 h-[400px] overflow-y-auto rounded-xl border border-neutral-200 bg-neutral-50 p-3">
    <div className="space-y-3">
     {messages.map((message, index) => (
      <div key={`${message.role}-${index}`} className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${message.role === "user" ? "ml-auto bg-black text-white" : "bg-white text-neutral-900 border border-neutral-200"}`}>
       {message.content}
      </div>
     ))}

     {loading && <div className="max-w-[85%] rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-500">Thinking...</div>}
    </div>
   </div>

   <form onSubmit={handleSubmit} className="flex gap-2">
    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about products..." className="flex-1 rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-500" disabled={loading} />
    <button type="submit" disabled={loading || !input.trim()} className="rounded-xl bg-black px-4 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50">
     Send
    </button>
   </form>
  </div>
 );
}
