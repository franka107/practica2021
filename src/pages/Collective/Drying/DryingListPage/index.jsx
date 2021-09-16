import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { columns, exampleTable } from "./constants";
import { dryingRouteOptions } from "../constants";
import { useStyles } from "../styles";
import CustomMaterialTable from "../../../../components/CustomMaterialTable";

function DryingListPage({ children, setTitle, setChipList }) {
  const history = useHistory();
  const location = useLocation();
  const [animalsList, setAnimalsList] = useState(exampleTable);
  const classes = useStyles();

  useEffect(() => {
    setTitle("Colectiva / Secado");
    setChipList(dryingRouteOptions(location));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container xs={12}>
      <Grid item xs={12} className={classes.registerContainer}>
        <CustomMaterialTable
          columns={columns}
          data={animalsList}
          filters={[
            { field: "allRegister", type: "text", title: "Todos registros" },
            { field: "allAge", type: "text", title: "Todas edades" },
            {
              field: "allStates",
              type: "text",
              title: "Todos estados",
            },
            {
              field: "allDates",
              type: "date",
              title: "Todas fechas",
            },
          ]}
          setData={setAnimalsList}
        />
      </Grid>
      {children()}
    </Grid>
  );
}

export default DryingListPage;
