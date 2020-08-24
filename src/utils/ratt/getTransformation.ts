import { TransformationScript, TransformationConfiguration } from "Definitions";
import transformScript from "./applyTransformation.txt";

async function getRattTransformationScript(configuration: TransformationConfiguration): Promise<TransformationScript> {
  const lines = transformScript.split("\n");
  lines.push(
    `applyTransformation({config:${JSON.stringify(configuration)},type:"ratt",source:"./${
      configuration.sourceFileName
    }"})`
  );
  return lines.join("\n");
}

export default getRattTransformationScript;
