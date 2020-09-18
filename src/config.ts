export interface WizardConfig {
  defaultBaseIri: string;
  prefixesUrl: string;
  publishOrder: PublishElement[];
}
export type PublishElement = "download" | "triplyDB";

export const wizardConfig: WizardConfig = {
  defaultBaseIri: "https://data.netwerkdigitaalerfgoed.nl/",
  prefixesUrl: "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ld-wizard/sdo/prefixes",
  publishOrder: ["download", "triplyDB"],
};
