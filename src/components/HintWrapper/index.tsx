import * as React from "react";
import { IconButton, Popover, Container, Typography, Box } from "@material-ui/core";
import FontAwesomeIcon from "components/FontAwesomeIcon";
import * as styles from "./style.scss";

interface Props {
  hint: string;
}

const HintWrapper: React.FC<Props> = ({ hint, children }) => {
  const [hintOpen, setHintOpen] = React.useState(false);
  const popOverRef = React.useRef<HTMLButtonElement>(null);
  return (
    <Box className={styles.hintField}>
      {children}
      <IconButton
        className={styles.hintButton}
        ref={popOverRef}
        size="small"
        disableRipple
        onMouseEnter={() => {
          setHintOpen(true);
        }}
        onMouseLeave={() => {
          setHintOpen(false);
        }}
      >
        <FontAwesomeIcon icon={["fas", "info"]} />
      </IconButton>

      <Popover
        open={hintOpen}
        className={styles.hintPopup}
        anchorEl={popOverRef.current}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Container className={styles.hintContent}>
          <Typography>{hint}</Typography>
        </Container>
      </Popover>
    </Box>
  );
};
export default HintWrapper;
