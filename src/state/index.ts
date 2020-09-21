import { atom, selector, DefaultValue } from "recoil";
import { TransformationConfiguration, Matrix } from "Definitions";
import { PrefixesArray } from "@triply/utils/lib/prefixUtils";
import { MD5 } from "jshashes";
import { wizardConfig } from "config";
const hasher = new MD5().setUTF8(true);
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

const matrixAtom = atom<Matrix | undefined>({
  key: "matrix",
  default: undefined,
});

export const transformationConfigState = atom<TransformationConfiguration>({
  key: "config",
  default: {
    baseIri: wizardConfig.defaultBaseIri,
    columnConfiguration: [],
    sourceFileName: "input.csv",
    resourceClass: "http://www.w3.org/2000/01/rdf-schema#Resource",
    csvProps: {
      delimiter: ",",
    },
  },
});

export const matrixState = selector({
  key: "sourceState",
  get: ({ get }) => get(matrixAtom),
  set: ({ set, reset }, newValue: Matrix | undefined | DefaultValue) => {
    if (newValue instanceof DefaultValue) {
      reset(matrixAtom);
    } else {
      set(matrixAtom, newValue);
      if (newValue) {
        set(transformationConfigState, (state) => {
          return {
            ...state,
            baseIri: wizardConfig.defaultBaseIri + hasher.hex(newValue.map((row) => row.join(",")).join("\n")).substr(0,6) + "/",
          };
        });
      }
    }
  },
});

export const prefixState = selector({
  key: "prefixes",
  get: async () => {
    try {
      const response = await fetch(wizardConfig.prefixesUrl);
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
