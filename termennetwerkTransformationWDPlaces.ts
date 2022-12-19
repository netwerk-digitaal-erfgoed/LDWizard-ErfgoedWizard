import { ColumnRefinement } from "@pldn/ldwizard/types/WizardConfig";
import { getUriOfSearchTerm } from "./termennetwerk";

const transformation: ColumnRefinement = {
  label: "Wikidata (Plaatsen)",
  type: "single",
  description:
    "Deze transformatie gebruikt het Termennetwerk om waardes in deze kolom te vervangen door Wikidata URIs van deze termen mits exact gematched. Zie de 'enriched csv' voor de details van deze matching. Voer de definitieve conversie hierop uit na controle van de matches.",
  transformation: async (searchTerm: string) => {
    const sources = ["https://query.wikidata.org/sparql#entities-places"];
    return getUriOfSearchTerm(sources, searchTerm);
  },
};
export default transformation;
