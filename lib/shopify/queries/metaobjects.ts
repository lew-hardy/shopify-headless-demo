export const getHomepageSectionsQuery = /* GraphQL */ `
 query getHomepageSections {
  metaobjects(type: "homepage_section", first: 25) {
   edges {
    node {
     id
     type
     handle
     fields {
      key
      value
      reference {
       __typename
       ... on Collection {
        handle
       }
       ... on MediaImage {
        image {
         url
         altText
        }
       }
      }
     }
    }
   }
  }
 }
`;
