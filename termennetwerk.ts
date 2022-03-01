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
      message: string;
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
    if (!Array.isArray(response.terms[0].result.terms) ||   // terms[] does not exists when an error occurs like a timeout
        response.terms[0].result.terms.length !== 1 ) {     // allow only a single result
          if (response.terms[0].result.message) {
            console.error('Error message from Network-of-Terms API: ',response.terms[0].result.message,' for keyword: ', searchTerm);
          }
          return undefined;
    }
    /*
      searchTerm 'fietsen (transportmiddelen)' => http://vocab.getty.edu/aat/300212636 (prefLabel)
      searchTerm 'rijwiel' => http://vocab.getty.edu/aat/300212636 (altLabel)
      searchTerm 'rijwielen' => http://vocab.getty.edu/aat/300212636 (altLabel)
      searchTerm 'fiets' => undefined (no match with prefLabel or altLabel)
    */
    const term = response.terms[0].result.terms[0];
    const inPrefLabel = term.prefLabel.find(
      (label) => {
         return label.toLowerCase() === searchTerm.toLowerCase();
      } 
    );

    const inAltLabel = term.altLabel.find(
      (label) => {
        return label.toLowerCase() === searchTerm.toLowerCase();
      } 
    );
    if (!inPrefLabel && !inAltLabel ) return undefined;
    
    cache[cacheKey] = term.uri;
    return term.uri;
}
