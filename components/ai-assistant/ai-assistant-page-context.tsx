"use client";

import { useEffect } from "react";
import { useAIAssistant } from "./ai-assistant-provider";

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

export function AIAssistantPageContext({ products }: { products: AssistantProduct[] }) {
 const { setPageProducts } = useAIAssistant();

 useEffect(() => {
  setPageProducts(products);

  return () => {
   setPageProducts([]);
  };
 }, [products, setPageProducts]);

 return null;
}
