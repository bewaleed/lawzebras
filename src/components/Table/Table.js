import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid , GridToolbar  } from "@material-ui/data-grid";
// core components
import Box from "@material-ui/core/Box";
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);
export default function CustomTable(props) {
  const classes = useStyles();
  return (
    <div className={classes.tableResponsive}>
      <Box style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={props.rowsData}
          columns={props.colsData}
          pageSize={5}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
    </div>
  );
}

