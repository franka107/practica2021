import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { columns, exampleTable, serviceRouteOptions } from "./constants";
import { useStyles } from "./styles";
import CustomMaterialTable from "../../components/CustomMaterialTable";
import ChipList from "../../components/ChipList";
// import ServiceHeader from "./ServiceHeader";

function ServicePage() {
  const [animalsList, setAnimalsList] = useState(exampleTable);

  const classes = useStyles();

  return (
    <Grid container xs={12}>
      <Grid item xs={12}>
        <Typography variant={"h6"}>Servicios</Typography>
      </Grid>
      <ChipList routes={serviceRouteOptions} />
      {/* <ServiceHeader /> */}
      <Grid item xs={12} className={classes.registerContainer}>
        <CustomMaterialTable
          columns={columns}
          data={animalsList}
          filters={[
            { field: "name", type: "text", title: "Arete" },
            { field: "registryDate", type: "date", title: "Fecha de registro" },
            { field: "typeService", type: "select", title: "Tipo de Servicio" },
          ]}
          setData={setAnimalsList}
        />
      </Grid>
    </Grid>
  );
}

export default ServicePage;
