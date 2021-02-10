import { ColumnRefinement } from "@netwerkdigitaalerfgoed/ldwizard/types/WizardConfig";
import { getUriOfSearchTerm } from "./termennetwerk";

const transformation: ColumnRefinement = {
  label: "Termennetwerk (AAT)",
  description:
    "Deze transformatie gebruikt het Termennetwerk om waardes in deze kolom te vervangen door de AAT-URIs van deze termen mits exact gematched. Zie de 'enriched csv' voor de details van deze matching. Voer de definitieve conversie hierop uit na controle van de matches.",
  transformation: async (searchTerm: string) => {
    const sources = ["http://vocab.getty.edu/aat/sparql"];
    return getUriOfSearchTerm(sources, searchTerm);
  },
};
export default transformation;
