import { GetClassSuggestions, GetPropertySuggestions } from "Definitions";
import { getClassSuggestions, getPropertySuggestions } from "./search";

export interface WizardConfig {
  defaultBaseIri: string;
  prefixesUrl: string;
  publishOrder: PublishElement[];
  getClassSuggestions: GetClassSuggestions;
  getPropertySuggestions: GetPropertySuggestions;
}
export type PublishElement = "download" | "triplyDB";

export const wizardConfig: WizardConfig = {
  defaultBaseIri: "https://data.netwerkdigitaalerfgoed.nl/",
  getClassSuggestions: getClassSuggestions,
  getPropertySuggestions: getPropertySuggestions,
  prefixesUrl: "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ld-wizard/sdo/prefixes",
  publishOrder: ["download", "triplyDB"],
};
