export interface WizardConfig {
  publishOrder: PublishElement[];
}
export type PublishElement = "download" | "triplyDB"

export const wizardConfig: WizardConfig = {
  publishOrder: ["download", "triplyDB"],
};
