import { ColumnRefinement } from "@netwerkdigitaalerfgoed/ldwizard/types/WizardConfig";
import { getUriOfSearchTerm } from "./termennetwerk";

const transformation: ColumnRefinement = {
  label: "Termennetwerk (CHT)",
  description:
    "Deze transformatie gebruikt het Termennetwerk om waardes in deze kolom te vervangen door URI's van deze termen uit de Cultuurhistorische Thesaurus (CHT), mits exact gematched. Zie de 'enriched csv' voor de details van deze matching. Voer de definitieve conversie hierop uit na controle van de matches.",
  transformation: async (searchTerm: string) => {
    const sources = ["https://data.cultureelerfgoed.nl/PoolParty/sparql/term/id/cht"];
    return getUriOfSearchTerm(sources, searchTerm);
  },
};
export default transformation;
