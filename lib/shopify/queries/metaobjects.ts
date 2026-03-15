export const getHomepageSectionsQuery = /* GraphQL */ `
  query getHomepageSections {
    metaobjects(type: "homepage_section", first: 50) {
      edges {
        node {
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
                }
              }
              ... on GenericFile {
                url
              }
            }
            references(first: 10) {
              nodes {
                __typename
                ... on Collection {
                  handle
                }
              }
            }
          }
        }
      }
    }
  }
`;
