import * as React from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ButtonBase,
  TextField,
} from "@material-ui/core";
import * as styles from "./style.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import { transformationConfigState, prefixState } from "state";
import { Autocomplete } from "@material-ui/lab";
import { getPrefixed } from "@triply/utils/lib/prefixUtils";
import getClassName from "classnames";
import HintWrapper from "components/HintWrapper";
import { AutocompleteSuggestion, getAutocompleteResults } from "utils/autocomplete";

interface Props {}
const TableHeaders: React.FC<Props> = ({}) => {
  const transformationConfig = useRecoilValue(transformationConfigState);
  const [selectedHeader, setSelectedHeader] = React.useState<number | undefined>();
  const prefixes = useRecoilValue(prefixState);
  return (
    <>
      <TableHead>
        <TableRow>
          {transformationConfig.columnConfiguration.map((columnConfig, idx) => {
            const propertyIRI = transformationConfig.columnConfiguration[idx].propertyIri;
            const fullUri = propertyIRI ?? `${transformationConfig.baseIri}${columnConfig.columnName}`;
            const shortUri = propertyIRI !== undefined ? getPrefixed(propertyIRI, prefixes) || propertyIRI : "";
            const isKeyColumn = idx === transformationConfig.key;
            return (
              <TableCell
                key={`${columnConfig.columnName}${idx}`}
                className={getClassName(styles.tableHeader, { [styles.disabled]: isKeyColumn })}
                // Implement the disable here, I still want to be able to use tooltip
                onClick={isKeyColumn ? undefined : () => setSelectedHeader(idx)}
                // Replace Default tableCell with ButtonBase to create ripple effects on click
                component={(props) => (
                  <Tooltip title={isKeyColumn ? "This column will be used to create identifiers" : fullUri}>
                    <ButtonBase {...props} component="th" />
                  </Tooltip>
                )}
              >
                <strong>{columnConfig.columnName + (isKeyColumn ? " (Key)" : "")}</strong>
                <br />
                {shortUri ? <Typography variant="caption">{shortUri}</Typography> : <br />}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
      <ColumnConfigDialog
        key={selectedHeader}
        selectedHeader={selectedHeader}
        onClose={() => setSelectedHeader(undefined)}
      />
    </>
  );
};
interface AutoCompleteProps {
  selectedHeader: number | undefined;
  onClose: () => void;
}
const ColumnConfigDialog: React.FC<AutoCompleteProps> = ({ selectedHeader, onClose }) => {
  const [transformationConfig, setTransformationConfig] = useRecoilState(transformationConfigState);
  const prefixes = useRecoilValue(prefixState);

  const [autocompleteError, setAutocompleteError] = React.useState<string | undefined>();
  const [autocompleteSuggestions, setAutocompleteSuggestions] = React.useState<AutocompleteSuggestion[]>([]);
  const selectedColumn =
    (selectedHeader !== undefined && transformationConfig.columnConfiguration[selectedHeader]) || undefined;
  const [propertyIri, setPropertyIri] = React.useState(selectedColumn?.propertyIri || "");

  // Async call for results effect
  React.useEffect(() => {
    if (!selectedColumn) return;
    const searchTerm = propertyIri.length === 0 ? selectedColumn.columnName : propertyIri;
    const getAutocompleteSuggestions = async () => {
      setAutocompleteError(undefined);
      try {
        const results = await getAutocompleteResults(searchTerm, "predicate");
        setAutocompleteSuggestions(results);
      } catch (e) {
        console.error(e);
        setAutocompleteError(e.message);
        setAutocompleteSuggestions([]);
      }
    };
    getAutocompleteSuggestions();
  }, [selectedColumn, propertyIri]);

  const confirmIri = () => {
    setTransformationConfig((state) => {
      if (selectedHeader === undefined) return state;
      const columnConfiguration = [...state.columnConfiguration];
      // Objects in recoil arrays are read-only
      if (propertyIri.length === 0) {
        columnConfiguration[selectedHeader] = {
          columnName: columnConfiguration[selectedHeader].columnName,
          propertyIri: undefined,
        };
      } else {
        columnConfiguration[selectedHeader] = {
          columnName: columnConfiguration[selectedHeader].columnName,
          propertyIri: propertyIri,
        };
      }
      return {
        ...state,
        columnConfiguration: columnConfiguration,
      };
    });
    // Close the dialog
    onClose();
  };
  return (
    <Dialog open={selectedHeader !== undefined} onClose={onClose} fullWidth>
      <DialogTitle>
        Choose property (
        {selectedHeader !== undefined && transformationConfig.columnConfiguration[selectedHeader].columnName})
      </DialogTitle>
      <DialogContent>
        {selectedHeader !== undefined && (
          <form onSubmit={confirmIri}>
            <Autocomplete
              freeSolo
              options={autocompleteSuggestions}
              value={propertyIri}
              renderOption={(option: AutocompleteSuggestion) => (
                <div>
                  <Typography>{getPrefixed(option.iri, prefixes) || option.iri}</Typography>
                  {option.description && (
                    <Typography
                      dangerouslySetInnerHTML={{ __html: option.description }}
                      variant="caption"
                      className={styles.hint}
                    />
                  )}
                </div>
              )}
              getOptionLabel={(value: any) =>
                typeof value === "string" ? value : getPrefixed(value.iri, prefixes) || value.iri
              }
              onChange={(_event, newValue: string | AutocompleteSuggestion | null) => {
                if (!newValue) return;
                if (typeof newValue === "string") {
                  setPropertyIri(newValue);
                } else {
                  setPropertyIri(newValue.iri);
                }
              }}
              disableClearable
              openOnFocus
              renderInput={(props) => (
                <HintWrapper hint="This IRI will define the relation between the key column and this column">
                  <TextField
                    {...props}
                    autoFocus
                    label="property URI"
                    error={!!autocompleteError}
                    helperText={autocompleteError || getPrefixed(propertyIri, prefixes)}
                    placeholder={
                      transformationConfig.baseIri + transformationConfig.columnConfiguration[selectedHeader].columnName
                    }
                    InputLabelProps={{ shrink: true }}
                    type="url"
                    inputMode="url"
                    fullWidth
                    onChange={(event) => setPropertyIri(event.currentTarget.value)}
                  />
                </HintWrapper>
              )}
            />
          </form>
        )}
      </DialogContent>
      <DialogActions>
        <Button className={styles.actionButtons} variant="contained" color="primary" onClick={confirmIri}>
          Confirm
        </Button>
        <Button className={styles.actionButtons} onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default TableHeaders;
