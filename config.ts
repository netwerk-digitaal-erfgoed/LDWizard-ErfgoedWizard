import WizardConfig, { PrefixEntry } from "@netwerkdigitaalerfgoed/ldwizard/types/WizardConfig";
import TermennetwerkTransformationAAT from "./termennetwerkTransformationAAT";
import TermennetwerkTransformationCHT from "./termennetwerkTransformationCHT";
import TermennetwerkTransformationWDPersons from "./termennetwerkTransformationWDPersons";
import TermennetwerkTransformationWDPlaces from "./termennetwerkTransformationWDPlaces";
const img = require("./ndelogo.png").default;
// const favIcon = require("./logo.png").default;
const homePage = require("./homePage.md");

const wizardConfig: WizardConfig = {
  appName: "LDWizard - Erfgoed",
  defaultBaseIri: "https://data.netwerkdigitaalerfgoed.nl/",
  primaryColor: "#0a3dfa",
  secondaryColor: "#172a59",
  homepageMarkdown: homePage,
  publishOrder: ["download"],
  icon: img,
  //favIcon: favIcon,
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
export default wizardConfig;
