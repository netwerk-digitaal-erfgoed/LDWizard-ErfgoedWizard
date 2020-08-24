import * as React from "react";

import { useRecoilState } from "recoil";
import { transformationConfigState } from "state";

import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import HintWrapper from "components/HintWrapper";

import * as styles from "./style.scss";

interface Props {}

const ColumnSelector: React.FC<Props> = () => {
  const [transformationConfig, setTransformationConfig] = useRecoilState(transformationConfigState);

  return (
    <div className={styles.keyColumnWrapper}>
      <HintWrapper hint="The key column will be used to generate identifiers for each row">
        <FormControl className={styles.keyColumnSelector}>
          <InputLabel>Key column</InputLabel>
          <Select
            displayEmpty
            defaultValue={-1}
            value={transformationConfig.key ?? -1}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
              setTransformationConfig((state) => {
                if (typeof event.target.value === "number") {
                  const selectedColumn = state.columnConfiguration[event.target.value];
                  // We need to reset the property URI if it's already assigned
                  if (selectedColumn) {
                    const columnConfig = [...state.columnConfiguration];
                    columnConfig[event.target.value] = {
                      columnName: selectedColumn.columnName,
                      propertyIri: undefined,
                    };

                    return {
                      ...state,
                      key: event.target.value,
                      columnConfiguration: columnConfig,
                    };
                  } else {
                    return { ...state, key: undefined };
                  }
                }
                return state;
              })
            }
          >
            <MenuItem value={-1}>Row number</MenuItem>
            {transformationConfig.columnConfiguration.map((config, idx) => (
              <MenuItem key={config.columnName} value={idx}>
                {config.columnName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </HintWrapper>
    </div>
  );
};

export default ColumnSelector;
