import { ColumnRefinement } from "@netwerkdigitaalerfgoed/ldwizard/types/WizardConfig";
import { GraphQLClient, gql } from "graphql-request";

const endpoint = "https://termennetwerk-api.netwerkdigitaalerfgoed.nl/graphql";

interface GraphQlResponse {
  terms: {
    source: {
      name: string;
    };
    result: {
      terms: { uri: string }[];
    };
  }[];
}
const graphQlQuery = gql`
  query Terms($query: String!) {
    terms(
      sources: ["http://vocab.getty.edu/aat/sparql", "https://data.cultureelerfgoed.nl/PoolParty/sparql/term/id/cht"]
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

const transformation: ColumnRefinement = {
  label: "Termennetwerk",
  description:
    "Deze transformatie gebruikt het Termennetwerk om waardes in de kolom te vervangen met identificatie codes van deze termen. Zie https://termennetwerk.netwerkdigitaalerfgoed.nl/faq#ontwikkelaars voor meer informatie",
  transformation: async (searchTerm) => {
    if (searchTerm === "") return undefined;
    if (cache[searchTerm.toLowerCase()]) return cache[searchTerm.toLowerCase()];
    const result: GraphQlResponse = await client.request(graphQlQuery, { query: searchTerm });
    const firstResult = result.terms.find((source) => source.result.terms.length > 0)?.result.terms[0]?.uri;
    cache[searchTerm.toLowerCase()] = firstResult;
    return firstResult;
  },
};
export default transformation;
