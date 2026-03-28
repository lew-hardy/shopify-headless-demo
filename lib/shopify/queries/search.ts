export const getSearchProductsQuery = /* GraphQL */ `
 query getSearchProducts($query: String!, $first: Int!) {
  search(query: $query, first: $first, types: [PRODUCT]) {
   edges {
    node {
     ... on Product {
      id
      handle
      title
      featuredImage {
       url
       altText
       width
       height
      }
      priceRange {
       maxVariantPrice {
        amount
        currencyCode
       }
      }
     }
    }
   }
  }
 }
`;
