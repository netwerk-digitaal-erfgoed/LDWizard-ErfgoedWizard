import React from "react";
import Wizard from "containers/Wizard";
import { AppBar, Toolbar, Typography, Container, Paper } from "@material-ui/core";
import LDWizardImg from "!raw-loader!./LDWizard.svg";
import NDEImg from "./ndelogo.png";
import * as styles from "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
require("../../theme/global.scss");
interface Props {}
const App: React.FC<Props> = () => {
  return (
    <div className={styles.app}>
      <AppBar position="static" color="default">
        <Toolbar>
          <img src={NDEImg} className={styles.image} />
          <Typography>ErfgoedWizard</Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" className={styles.main}>
        <Wizard />
      </Container>
      <Paper component="footer" className={styles.footer}>
        {/* Is reversed in CSS */}
        <nav className={styles.footerNav}>
          <a href="https://github.com/netwerk-digitaal-erfgoed/LDWizard-ErfgoedWizard">
            <FontAwesomeIcon icon="book" /> Documentation
          </a>
          <a href="https://data.netwerkdigitaalerfgoed.nl/">
            <FontAwesomeIcon icon="database" /> Dataplatform
          </a>
          <a href="https://github.com/netwerk-digitaal-erfgoed/LDWizard-ErfgoedWizard">
            <FontAwesomeIcon icon={["fab", "github"]} /> Github
          </a>
        </nav>
        <div className={styles.LDWizardImg} dangerouslySetInnerHTML={{ __html: LDWizardImg }} />
      </Paper>
    </div>
  );
};
export default App;
