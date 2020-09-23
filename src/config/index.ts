import { ApplyTransformation, GetClassSuggestions, GetPropertySuggestions, GetTransformationScript } from "Definitions";
import getRattTransformationScript from "utils/ratt/getTransformation";
import getCowTransformationScript from "./cowScript";
import applyTransformation from "./rattScript";
import getRmlTransformationScript from "./rmlScript";
import { getClassSuggestions, getPropertySuggestions } from "./search";

export interface WizardConfig {
  defaultBaseIri: string;
  prefixesUrl: string;
  publishOrder: PublishElement[];
  getClassSuggestions: GetClassSuggestions;
  getPropertySuggestions: GetPropertySuggestions;
  getTransformationScript: GetTransformationScript;
  applyTransformation: ApplyTransformation;
}
export type PublishElement = "download" | "triplyDB";

export const wizardConfig: WizardConfig = {
  applyTransformation: applyTransformation,
  defaultBaseIri: "https://data.netwerkdigitaalerfgoed.nl/",
  getClassSuggestions: getClassSuggestions,
  getPropertySuggestions: getPropertySuggestions,
  prefixesUrl: "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ld-wizard/sdo/prefixes",
  publishOrder: ["download", "triplyDB"],
  getTransformationScript: (config, type) => {
    switch (type) {
      case "cow":
        return getCowTransformationScript(config);
      case "ratt":
        return getRattTransformationScript(config);
      case "rml":
        return getRmlTransformationScript(config);
      default:
        throw new Error(`Script ${type} has not been implemented yet`);
    }
  },
};
