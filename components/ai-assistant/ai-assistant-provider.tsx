"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type AssistantProduct = {
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

type ChatMessage = {
 role: "user" | "assistant";
 content: string;
 products?: { title: string; handle: string }[];
};

type AssistantContextValue = {
 isOpen: boolean;
 setIsOpen: (value: boolean) => void;
 messages: ChatMessage[];
 setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
 pageProducts: AssistantProduct[];
 setPageProducts: (products: AssistantProduct[]) => void;
};

const AssistantContext = createContext<AssistantContextValue | null>(null);

const STORAGE_KEY = "ai-assistant-state";

export function AIAssistantProvider({ children }: { children: React.ReactNode }) {
 const [isOpen, setIsOpen] = useState(false);
 const [messages, setMessages] = useState<ChatMessage[]>([
  {
   role: "assistant",
   content: "Hi — ask me about products in this store.",
  },
 ]);
 const [pageProducts, setPageProducts] = useState<AssistantProduct[]>([]);

 useEffect(() => {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
   const parsed = JSON.parse(raw) as {
    isOpen?: boolean;
    messages?: ChatMessage[];
   };

   if (typeof parsed.isOpen === "boolean") {
    setIsOpen(parsed.isOpen);
   }

   if (Array.isArray(parsed.messages) && parsed.messages.length > 0) {
    setMessages(parsed.messages);
   }
  } catch {
   // ignore bad storage
  }
 }, []);

 useEffect(() => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ isOpen, messages }));
 }, [isOpen, messages]);

 const value = useMemo(
  () => ({
   isOpen,
   setIsOpen,
   messages,
   setMessages,
   pageProducts,
   setPageProducts,
  }),
  [isOpen, messages, pageProducts],
 );

 return <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>;
}

export function useAIAssistant() {
 const context = useContext(AssistantContext);

 if (!context) {
  throw new Error("useAIAssistant must be used within AIAssistantProvider");
 }

 return context;
}
