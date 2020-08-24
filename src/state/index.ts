import { atom, selector } from "recoil";
import { TransformationConfiguration, Matrix } from "Definitions";
import { PrefixesArray } from "@triply/utils/lib/prefixUtils";

const DEFAULT_PREFIXES: PrefixesArray = [
  {
    iri: "https://schema.org/",
    prefixLabel: "schema",
  },
];

export const sourceState = atom<File | string | undefined>({
  key: "source",
  default: undefined,
});

export const matrixState = atom<Matrix | undefined>({
  key: "matrix",
  default: undefined,
});

export const transformationConfigState = atom<TransformationConfiguration>({
  key: "config",
  default: {
    baseIri: "https://data.netwerkdigitaalerfgoed.nl/",
    columnConfiguration: [],
    sourceFileName: "input.csv",
    resourceClass: "http://www.w3.org/2000/01/rdf-schema#Resource",
    csvProps: {
      delimiter: ",",
    },
  },
});

export const prefixState = selector({
  key: "prefixes",
  get: async () => {
    try {
      const response = await fetch("https://api.data.netwerkdigitaalerfgoed.nl/datasets/ld-wizard/sdo/prefixes");
      if (response.ok) {
        const prefixes: PrefixesArray = await response.json();
        return prefixes;
      }
      return DEFAULT_PREFIXES;
    } catch {
      return DEFAULT_PREFIXES;
    }
  },
});
