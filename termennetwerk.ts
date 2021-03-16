import { GraphQLClient, gql } from "graphql-request";

const endpoint = "https://termennetwerk-api.netwerkdigitaalerfgoed.nl/graphql";

interface GraphQlResponse {
  terms: {
    source: {
      name: string;
    };
    result: {
      terms: {
        uri: string;
        prefLabel: string[];
        altLabel: string[];
      }[];
    };
  }[];
}
const graphQlQuery = gql`
  query Terms($sources: [ID]! $query: String!) {
    terms(
      sources: $sources
      query: $query
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

export async function getUriOfSearchTerm(sources: string[], searchTerm: string): Promise<string> {
    if (searchTerm === "") return undefined;
    const cacheKey = searchTerm.toLowerCase();
    if (cache[cacheKey]) return cache[cacheKey];
    const response: GraphQlResponse = await client.request(graphQlQuery, { sources, query: searchTerm });
    if (!Array.isArray(response.terms) ||
        response.terms[0].result.terms.length !== 1 ||
        !response.terms[0].result ||
        !response.terms[0].result.terms ||
        !Array.isArray(response.terms[0].result.terms)) {
          return undefined;
    }

    /*
      searchTerm 'fietsen (transportmiddelen)' => http://vocab.getty.edu/aat/300212636 (prefLabel)
      searchTerm 'rijwiel' => http://vocab.getty.edu/aat/300212636 (altLabel)
      searchTerm 'rijwielen' => http://vocab.getty.edu/aat/300212636 (altLabel)
      searchTerm 'fiets' => undefined (no match with prefLabel or altLabel)
    */
    const term = response.terms[0].result.terms.find((term) => term.prefLabel.includes(searchTerm) || term.altLabel.includes(searchTerm));
    if (term === undefined) return undefined;
    cache[cacheKey] = term.uri;
    return term.uri;
}
