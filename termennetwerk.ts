import { GraphQLClient, gql } from "graphql-request";

const endpoint = "https://termennetwerk-api.netwerkdigitaalerfgoed.nl/graphql";

interface GraphQlResponse {
  terms: {
    source: {
      name: string;
    };
    result: {
      __typename: string;
      terms: {
        uri: string;
        prefLabel: string[];
        altLabel: string[];
      }[];
      message: string;
    };
  }[];
}
const graphQlQuery = gql`
  query Terms($sources: [ID]! $query: String!) {
    terms(
      sources: $sources
      query: $query
      queryMode: OPTIMIZED
    ) {
      source {
        name
      }
      result {
        __typename
        ... on Terms {
          terms {
            uri
            prefLabel
            altLabel
          }
        }
        ... on Error {
          message
        }
      }
    }
  }
`;

const cache: { [query: string]: string } = {};

const client = new GraphQLClient(endpoint);

export async function getUriOfSearchTerm(sources: string[], searchTerm: string): Promise<string | undefined> {
    if (searchTerm === "") return undefined;
    const cacheKey = searchTerm.toLowerCase();
    if (cache[cacheKey]) return cache[cacheKey];
    const response: GraphQlResponse = await client.request(graphQlQuery, { sources, query: searchTerm });
    const result = response.terms[0].result;
//    if (!Array.isArray(result.terms) ||   
    if (result.__typename === 'TimeoutError') { // catch timeouts errors
      console.error(`Timeout error from Network-of-Terms API: "${result.message}" for keyword: "${searchTerm}"`);
      return undefined; 
    }
    if (result.terms.length !== 1 ) return undefined; // allow only a single result
          
    const term = response.terms[0].result.terms[0];
    const containsSearchTerm = (label: string) => label.toLowerCase() === searchTerm.toLowerCase();
    const inPrefLabel = term.prefLabel.some(containsSearchTerm); // exact match for prefLabel?
    const inAltLabel = term.altLabel.some(containsSearchTerm);   // exact match for altLabel?
    if (!inPrefLabel && !inAltLabel ) return undefined; // no matches found
    
    cache[cacheKey] = term.uri;
    return term.uri;
}
