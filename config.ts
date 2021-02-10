import WizardConfig, { PrefixEntry } from "@netwerkdigitaalerfgoed/ldwizard/types/WizardConfig";
import TermennetwerkTransformationAAT from "./termenNetwerkTransformationAAT";
import TermennetwerkTransformationCHT from "./termennetwerkTransformationCHT";
const img = require("./ndelogo.png").default;
// const favIcon = require("./logo.png").default;
const homePage = require("./homePage.md");

const wizardConfig: WizardConfig = {
  appName: "Erfgoed Wizard",
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
  },
  columnRefinements: [TermennetwerkTransformationAAT, TermennetwerkTransformationCHT],
};
export default wizardConfig;
