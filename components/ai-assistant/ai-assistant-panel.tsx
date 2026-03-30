"use client";

import Link from "next/link";
import { useState } from "react";
import { useAIAssistant } from "./ai-assistant-provider";

export function AIAssistantPanel() {
 const { isOpen, setIsOpen, messages, setMessages, pageProducts } = useAIAssistant();
 const [input, setInput] = useState("");
 const [loading, setLoading] = useState(false);

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
     products: pageProducts,
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
     products: data.products,
    },
   ]);
  } catch (error) {
   const errorMessage = error instanceof Error ? error.message : "Something went wrong.";

   setMessages((prev) => [
    ...prev,
    {
     role: "assistant",
     content: `Error: ${errorMessage}`,
    },
   ]);
  } finally {
   setLoading(false);
  }
 }

 return (
  <div className="fixed right-4 bottom-4 z-50">
   {isOpen ? (
    <div className="w-[380px] rounded-2xl border border-neutral-200 bg-white p-4 shadow-xl">
     <div className="mb-4 flex items-center justify-between">
      <div>
       <h2 className="text-lg font-semibold">Shopping Assistant</h2>
       <p className="text-xs text-neutral-500">Answers are based on products from the current page.</p>
      </div>
      <button type="button" onClick={() => setIsOpen(false)} className="text-sm text-neutral-500">
       Close
      </button>
     </div>

     <div className="mb-4 h-[360px] overflow-y-auto rounded-xl border border-neutral-200 bg-neutral-50 p-3">
      <div className="space-y-3">
       {messages.map((message, index) => (
        <div key={`${message.role}-${index}`} className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${message.role === "user" ? "ml-auto bg-black text-white" : "border border-neutral-200 bg-white text-neutral-900"}`}>
         <div>{message.content}</div>

         {message.products && message.products.length > 0 && (
          <div className="mt-2 space-y-1">
           {message.products.map((product) => (
            <Link key={product.handle} href={`/product/${product.handle}`} className="block text-sm underline">
             {product.title}
            </Link>
           ))}
          </div>
         )}
        </div>
       ))}

       {loading && <div className="max-w-[85%] rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-500">Thinking...</div>}
      </div>
     </div>

     <form onSubmit={handleSubmit} className="flex gap-2">
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about products..." className="flex-1 rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-500" disabled={loading} />
      <button type="submit" disabled={loading || !input.trim() || pageProducts.length === 0} className="rounded-xl bg-black px-4 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50">
       Send
      </button>
     </form>
    </div>
   ) : (
    <button type="button" onClick={() => setIsOpen(true)} className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white shadow-lg">
     Chat
    </button>
   )}
  </div>
 );
}
