import React from "react";
import styles from "./style.scss";
import { Box, Container, Button, Card, CardActions, CardContent, CardHeader, Typography } from "@material-ui/core";
import FontAwesomeIcon from "components/FontAwesomeIcon";

import { useHistory, Redirect } from "react-router-dom";
import applyTransformation from "utils/ratt/applyTransformation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { matrixState, sourceState, transformationConfigState } from "state";
import { TransformationType, GetTransformationScript } from "Definitions";
import getRattTransformationScript from "utils/ratt/getTransformation";
import getCowTransformationScript from "utils/cow/getTransformation";
import getRmlTransformationScript from "utils/rml/getTransformation";
import TriplyDBUpload from "./TriplyDBPublishForm";
import { Skeleton, Alert } from "@material-ui/lab";
import SplitButton from "components/SplitButton";
import ErrorBoundary from "components/ErrorBoundary";
import { currentTokenState } from "state/clientJs";
interface Props {}
export const Step = 3;
const Publish: React.FC<Props> = ({}) => {
  const parsedCsv = useRecoilValue(matrixState);
  const source = useRecoilValue(sourceState);
  const transformationConfig = useRecoilValue(transformationConfigState);
  const setCurrentToken = useSetRecoilState(currentTokenState);
  const history = useHistory();
  const downloadRef = React.useRef<HTMLAnchorElement>(null);
  const [transformationResult, setTransformationResult] = React.useState<string>();
  const [transformationError, setTransformationError] = React.useState<string>();
  React.useEffect(() => {
    const transformFunction = async () => {
      setTransformationResult(undefined);
      setTransformationError(undefined);
      if (parsedCsv) {
        const transformationResult = await applyTransformation({
          config: transformationConfig,
          source: parsedCsv,
          type: "ratt",
        });
        setTransformationResult(transformationResult);
      }
    };
    transformFunction().catch((e) => {
      setTransformationError(e.message);
    });
  }, [transformationConfig, parsedCsv]);

  if (!source || !parsedCsv) {
    return <Redirect to="/1" />;
  }
  if (transformationError) {
    return (
      <>
        <Container>
          <Alert severity="error">{transformationError}</Alert>
        </Container>
        <Box>
          <Button className={styles.actionButtons} onClick={() => history.push(`/${Step - 1}`)}>
            Back
          </Button>
          <Button className={styles.actionButtons} variant="contained" color="primary" disabled>
            Next
          </Button>
        </Box>
      </>
    );
  }

  if (!transformationResult) {
    return (
      <Container>
        <Skeleton animation="wave" width="100%" height="70vh" />
      </Container>
    );
  }
  const downloadFile = (content: File | string | undefined, defaultName: string, mediaType: string) => {
    if (!downloadRef.current || !content) return;
    if (typeof content === "string") {
      const blob = new Blob([content], { type: mediaType });
      downloadRef.current.href = URL.createObjectURL(blob);
      downloadRef.current.download = defaultName;
    } else {
      downloadRef.current.href = URL.createObjectURL(content);
      downloadRef.current.download = content?.name || defaultName;
    }
    downloadRef.current.click();
  };
  const getDownloadScript: GetTransformationScript = (configuration, type) => {
    switch (type) {
      case "ratt":
        return getRattTransformationScript(configuration);
      case "cow":
        return getCowTransformationScript(configuration);
      case "rml":
        return getRmlTransformationScript(configuration);
      default:
        throw new Error("Unknown script selected");
    }
  };
  return (
    <>
      <Container>
        <div>
          <ErrorBoundary
            resetAction={(errorText: string) => {
              // Token is valid, but CORS fails, expect api not to be up
              if (
                errorText ===
                  "Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc." ||
                // Token is deleted
                errorText === "Token does not exist."
              ) {
                localStorage.removeItem("token");
                setCurrentToken("");
              }
            }}
          >
            <React.Suspense fallback={<Skeleton variant="rect" height={200} />}>
              <TriplyDBUpload transformationResult={transformationResult} />
            </React.Suspense>
          </ErrorBoundary>

          <Card className={styles.segment} variant="outlined">
            <CardHeader
              title={<Typography variant="h5">Advanced</Typography>}
              avatar={<FontAwesomeIcon icon={["fas", "download"]} />}
            />
            <CardContent className={styles.downloadContent}>
              <Container className={styles.downloadContainer}>
                <Card variant="outlined" className={styles.downloadSegment}>
                  <CardHeader
                    title="Download CSV
"
                    avatar={<FontAwesomeIcon icon={["fas", "file-csv"]} />}
                  />
                  <CardContent className={styles.downloadContent}>
                    Download your tabular source data as standardized CSV.{" "}
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => downloadFile(source, "source.csv", "text/csv")}
                      component="span"
                      variant="contained"
                      color="primary"
                      disabled={!source}
                    >
                      Download CSV
                    </Button>
                  </CardActions>
                </Card>
                <Card variant="outlined" className={styles.downloadSegment}>
                  <CardHeader title="Download RDF" avatar={<FontAwesomeIcon icon="file" />} />
                  <CardContent className={styles.downloadContent}>
                    Download the transformed Linked Data (RDF) to your local machine.
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => downloadFile(transformationResult, "result.nt", "application/n-triples")}
                      component="span"
                      variant="contained"
                      color="primary"
                    >
                      Download RDF
                    </Button>
                  </CardActions>
                </Card>
                <Card variant="outlined" className={styles.downloadSegment}>
                  <CardHeader title="Download script" avatar={<FontAwesomeIcon icon="file-code" />} />
                  <CardContent className={styles.downloadContent}>
                    Download a script that you can use to run the transformation yourself. The following script
                    languages are supported: RATT, CoW, RML.
                  </CardContent>
                  <CardActions>
                    <SplitButton
                      actions={["rml","cow", "ratt"]}
                      getButtonlabel={(selectedOption) => `Download ${selectedOption}`}
                      getOptionsLabel={(option) => (option === "cow" ? "CoW" : option.toUpperCase())}
                      onActionSelected={(result) =>
                        getDownloadScript(transformationConfig, result as TransformationType).then((file) => {
                          const fileBase =
                          // Removes extension from filename
                            typeof source !== "string" ? source.name.replace(/\.[^/.]+$/, "") : undefined;
                          if (typeof file === "string") {
                            if (result === "ratt") {
                              downloadFile(file, `${fileBase ? fileBase + "." : ""}convert.ts`, "text/x-typescript");
                            } else if (result === "cow") {
                              const fileName =
                                typeof source === "string"
                                  ? `convert.csv-metadata.json`
                                  : `${source?.name}-metadata.json`;
                              downloadFile(file, fileName, "application/json+ld");
                            } else if (result === "rml") {
                              downloadFile(file, `${fileBase || "rules"}.rml.ttl`, "text/turtle");
                            }
                          }
                        })
                      }
                    />
                  </CardActions>
                </Card>
              </Container>
            </CardContent>
          </Card>
        </div>
      </Container>
      <Box>
        <Button className={styles.actionButtons} onClick={() => history.push(`/${Step - 1}`)}>
          Back
        </Button>
        <Button className={styles.actionButtons} variant="contained" color="primary" disabled>
          Next
        </Button>
      </Box>
      <a style={{ visibility: "hidden" }} ref={downloadRef} />
    </>
  );
};
export default Publish;
