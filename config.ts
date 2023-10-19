import WizardConfig, { PrefixEntry } from "@pldn/ldwizard/types/WizardConfig";
import TermennetwerkTransformationAAT from "./termennetwerkTransformationAAT";
import TermennetwerkTransformationCHT from "./termennetwerkTransformationCHT";
import TermennetwerkTransformationWDPersons from "./termennetwerkTransformationWDPersons";
import TermennetwerkTransformationWDPlaces from "./termennetwerkTransformationWDPlaces";

// @ts-ignore
import img from "./ndelogo.png";

// @ts-ignore
import favIcon from "./favicon.png";

// @ts-ignore
import homePage from "./homePage.md";

const wizardConfig: WizardConfig = {
  appName: "LDWizard - Erfgoed",
  defaultBaseIri: "https://data.netwerkdigitaalerfgoed.nl/",
  primaryColor: "#0a3dfa",
  secondaryColor: "#172a59",
  homepageMarkdown: homePage,
  publishOrder: ["download"],
  icon: img,
  favIcon: favIcon,
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
  columnRefinements: [
    TermennetwerkTransformationAAT,
    TermennetwerkTransformationCHT,
    TermennetwerkTransformationWDPersons,
    TermennetwerkTransformationWDPlaces,
  ],
};
globalThis.wizardConfig = wizardConfig;
