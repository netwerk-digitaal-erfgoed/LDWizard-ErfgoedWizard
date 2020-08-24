import { TransformationScript, TransformationConfiguration } from "Definitions";
import { cleanHeaderName } from "utils/helpers";

interface CowColumn {
  "@id"?: string;
  datatype?: string;
  name?: string;
  propertyUrl?: string;
  aboutUrl?: string;
  valueUrl?: string;
  virtual?: boolean;
  "csvw:value"?: string;
}

interface CowTransformation {
  "@id": string;
  "@context": [string, { "@base": string }];
  url: string;
  dialect: {
    delimiter: string;
    encoding: string;
    quoteChar: string;
  };
  tableSchema: {
    aboutUrl: string;
    primaryKey: string;
    columns: CowColumn[];
  };
}

async function getCowTransformationScript(configuration: TransformationConfiguration): Promise<TransformationScript> {
  const baseIri = configuration.baseIri.toString();

  const columns: CowColumn[] = [];
  const keyColumn = `{${
    configuration.key !== undefined ? configuration.columnConfiguration[configuration.key].columnName : "_row"
  }}`;
  columns.push({
    virtual: true,
    propertyUrl: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
    aboutUrl: keyColumn,
    valueUrl: configuration.resourceClass,
  });
  for (const columnConfig of configuration.columnConfiguration) {
    if (columnConfig.columnName.length === 0) continue;
    columns.push({
      datatype: "string",
      "@id": `${baseIri}column/${columnConfig.columnName}`,
      name: columnConfig.columnName,
      propertyUrl: columnConfig.propertyIri ?? `${baseIri}${cleanHeaderName(columnConfig.columnName)}`,
    });
  }

  const script: CowTransformation = {
    "@id": baseIri,
    "@context": [
      "https://raw.githubusercontent.com/CLARIAH/COW/master/csvw.json",
      {
        "@base": baseIri,
      },
    ],
    url: "",
    dialect: {
      delimiter: configuration.csvProps.delimiter,
      encoding: "UTF-8",
      quoteChar: '"',
    },
    tableSchema: {
      aboutUrl: keyColumn,
      primaryKey: "Resource",
      columns: columns,
    },
  };
  return JSON.stringify(script, undefined, 2);
}

export default getCowTransformationScript;
