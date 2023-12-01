import { GraphQLClient, gql } from "graphql-request";
import { ColumnRefinement } from "@pldn/ldwizard/types/WizardConfig";

const endpoint = "https://termennetwerk-api.netwerkdigitaalerfgoed.nl/graphql";

interface Term {
  uri: string;
  prefLabel: string[];
  altLabel: string[];
}

interface Result {
  __typename: string;
  terms: Term[];
  message: string;
};

interface TermsResponse {
  terms: {
    source: {
      name: string;
    };
    result: Result;
  }[];
}

interface SourcesResponse {
  sources: {
    uri: string,
    name: string,
    description: string
  }[];
}

const queryTerms = gql`
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

const querySources = gql`
  query Sources {
    sources {
      uri
      name
    }
  }
`;

const cache: { [query: string]: string } = {};

const client = new GraphQLClient(endpoint);

function selectTerm(result: Result, searchTerm: string, source: string): Term | undefined {

    if (result.__typename === 'ServerError') { // catch server errors
      console.log("Termennetwerk refinement: server error for source",source);
      return undefined; 
    }

    if (result.__typename === 'TimeoutError') { // catch timeouts errors
      console.log("Termennetwerk refinement: time out for source", source);
      return undefined; 
    }

    if (result.terms.length === 0 ) { // no results found
      //console.log("Termennetwerk refinement: no results for",searchTerm,"in",source);
      return undefined; 
    }

    var countMatches = 0;
    var matchedTerm:Term = <Term>{};
    for( const nr in result.terms ) {
      const term = result.terms[nr];
      const containsSearchTerm = (label: string) => label.toLowerCase() === searchTerm.toLowerCase();
      const inPrefLabel = term.prefLabel.some(containsSearchTerm); // exact match for prefLabel?
      const inAltLabel = term.altLabel.some(containsSearchTerm);   // exact match for altLabel?
      if ( inPrefLabel || inAltLabel ) {
        countMatches=+1;
        matchedTerm=term;
      }
    }
    if(countMatches==1){
      //console.log("Termennetwerk refinement: found single exact match for",searchTerm,"in",source);
      return matchedTerm;
    }
    else {
      //console.log("Termennetwerk refinement: no single exact match found for",searchTerm,"in",source);
      return undefined; // no matches found
    }
}

export async function getUriOfSearchTerm(sources: string[], searchTerm: string): Promise<string | undefined> {
    if (searchTerm.trim() === "") return undefined;
    const cacheKey = searchTerm.toLowerCase();
    if (cache[cacheKey]) return cache[cacheKey];
    const response: TermsResponse = await client.request(queryTerms, { sources, query: searchTerm });
    for( const term in response){
        for( const sourcenr in response[term]) {
          const source = response[term][sourcenr].source.name;
          const result = response[term][sourcenr].result;
          const selectedTerm = selectTerm(result, searchTerm, source);
          if( selectedTerm ) {
            cache[cacheKey] = selectedTerm.uri;
            return selectedTerm.uri;
          }
        }
    }
    return undefined;
}

export async function getRefinementList():Promise<ColumnRefinement[]> {
  const response: SourcesResponse = await client.request(querySources);
  var refinementList: ColumnRefinement[] = [];
  for( const sourcenr in response.sources ){
    //console.log("Source loop index",sourcenr);
    const refinement:ColumnRefinement = {
      label: "Termennetwerk: "+response.sources[sourcenr].name,
      type: "single",
      description: response.sources[sourcenr].description,
      transformation: async (searchTerm: string) => {
        const sources = [response.sources[sourcenr].uri];
        return getUriOfSearchTerm(sources, searchTerm);
      },
      yieldsIri: true
    }
    refinementList.push(refinement)
  }
  return refinementList;
}