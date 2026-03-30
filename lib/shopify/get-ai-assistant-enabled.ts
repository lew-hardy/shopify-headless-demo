import { shopifyFetch } from "./index";

const getAiAssistantEnabledQuery = /* GraphQL */ `
 query getAiAssistantEnabled {
  shop {
   metafield(namespace: "custom", key: "ai_assistant_enabled") {
    value
   }
  }
 }
`;

export async function getAiAssistantEnabled(): Promise<boolean> {
 try {
  const res = await shopifyFetch<{
   data: {
    shop: {
     metafield: {
      value: string | null;
     } | null;
    };
   };
  }>({
   query: getAiAssistantEnabledQuery,
  });

  const value = res.body.data.shop.metafield?.value;

  return value === "true";
 } catch (e) {
  console.error("Failed to fetch AI assistant setting", e);

  // fail safe → OFF
  return false;
 }
}
