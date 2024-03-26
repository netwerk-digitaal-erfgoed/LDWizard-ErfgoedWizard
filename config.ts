import WizardConfig, { ColumnRefinement, PrefixEntry } from "@pldn/ldwizard/types/WizardConfig";
import { getUriOfSearchTerm, getRefinementList } from "./termennetwerk";

// @ts-ignore
import img from "./ndelogo.png";

// @ts-ignore
import favIcon from "./favicon.png";

// @ts-ignore
import homePage from "./homePage.md";

async function initSources() {
  var sourceList = await getRefinementList();

  globalThis.wizardConfig.columnRefinements.push(...sourceList);
}

const wizardConfig: WizardConfig = {
  appName: "LDWizard - Erfgoed",
  defaultBaseIri: "https://data.netwerkdigitaalerfgoed.nl/",
  primaryColor: "#0a3dfa",
  secondaryColor: "#172a59",
  homepageMarkdown: homePage,
  publishOrder: ["download"],
  icon: img,
  favIcon: favIcon,
  classConfig: {
    method: "elastic",
    endpoint: "https://api.data.netwerkdigitaalerfgoed.nl/datasets/NDE/ldwizard/services/ldwizard/_search",
  },
  predicateConfig: {
    method: "elastic",
    endpoint: "https://api.data.netwerkdigitaalerfgoed.nl/datasets/NDE/ldwizard/services/ldwizard/_search",
  },
  dataplatformLink: "https://data.netwerkdigitaalerfgoed.nl/",
  repositoryLink: "https://github.com/netwerk-digitaal-erfgoed/LDWizard-ErfgoedWizard",
  getAllowedPrefixes: async () => {
    const response = await fetch("https://api.data.netwerkdigitaalerfgoed.nl/datasets/ld-wizard/sdo/prefixes");
    if (response.ok) {
      const prefixes: PrefixEntry[] = await response.json();
      return prefixes;
    }
    console.error("Prefixes retrieval failed");
    return [];
  },
  columnRefinements: [
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
        owlSameAsRelationship: false,
      },
    },
  ],
};

export default globalThis.wizardConfig = wizardConfig;
initSources();
