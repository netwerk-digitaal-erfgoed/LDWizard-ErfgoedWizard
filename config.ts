import WizardConfig, { ColumnRefinement, PrefixEntry } from "@pldn/ldwizard/types/WizardConfig";
import { getUriOfSearchTerm, getRefinementList } from "./termennetwerk";

// @ts-ignore
import img from "./ndelogo.png";

// @ts-ignore
import favIcon from "./favicon.png";

// @ts-ignore
import homePage from "./homePage.md";

var sourceList=await getRefinementList();

const refinements:ColumnRefinement[] = [
  {
    label: "Verwerk als URI/IRI",
    type: "single",
    description:
    "In this transformation the returned value should be an IRI, this can be applied to the 'IRIs' column in the example.csv file",
    transformation: async (term: string) => {
      return `${term}`;
    },
    yieldsIri: true,
    keepOriginalValue: {
      keepValue: false,
    },
  },
/*
  {
    label: "Termennetwerk - Concepten",
    type:"single",
    description:
      "Deze transformatie gebruikt het Termennetwerk om waardes in deze kolom te vervangen door de AAT-URIs van deze termen mits exact gematched. Zie de 'enriched csv' voor de details van deze matching. Voer de definitieve conversie hierop uit na controle van de matches.",
    transformation: async (searchTerm: string) => {
      const sources = [
        "http://vocab.getty.edu/aat/sparql",
        "https://data.cultureelerfgoed.nl/PoolParty/sparql/term/id/cht",
      ];
      return getUriOfSearchTerm(sources, searchTerm);
    },
    yieldsIri: true
  },
*/
];

const list = refinements.concat(sourceList);

const wizardConfig: WizardConfig = {
  appName: "LDWizard - Erfgoed",
  defaultBaseIri: "https://data.netwerkdigitaalerfgoed.nl/",
  primaryColor: "#0a3dfa",
  secondaryColor: "#172a59",
  homepageMarkdown: homePage,
  publishOrder: ["download"],
  icon: img,
  favIcon: favIcon,
  classConfig: { method:"elastic", endpoint: "https://api.data.netwerkdigitaalerfgoed.nl/datasets/NDE/ldwizard/services/ldwizard/_search" },
  predicateConfig: { method:"elastic", endpoint: "https://api.data.netwerkdigitaalerfgoed.nl/datasets/NDE/ldwizard/services/ldwizard/_search" },
  dataplatformLink: "https://data.netwerkdigitaalerfgoed.nl/",
  repositoryLink: "https://github.com/netwerk-digitaal-erfgoed/LDWizard-ErfgoedWizard",
  getAllowedPrefixes: async () => {
    const response = await fetch("https://api.data.netwerkdigitaalerfgoed.nl/datasets/ld-wizard/sdo/prefixes");
    if (response.ok) {
      const prefixes: PrefixEntry[] = await response.json();
      return prefixes;
    }
    console.error("Prefixes retrieval failed")
    return [];
  },
  columnRefinements: list
} 
export default globalThis.wizardConfig = wizardConfig;