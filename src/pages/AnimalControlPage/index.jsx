import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Grid, Typography, IconButton } from "@material-ui/core";
import AnimalDescription from "./AnimalDescription";
import AnimalCharts from "./AnimalCharts";
import AddAnimals from "./AddAnimals";
import CustomMaterialTable from "../../components/CustomMaterialTable";
import { useStyles } from "./styles";
import { columnsToCustomMaterialTable, cowsDataExample } from "./constants";
import { Delete, Edit, Visibility, Star, StarBorder } from "@material-ui/icons";

function AnimalControlPage() {
  const [animalsList, setAnimalsList] = useState(cowsDataExample);
  const classes = useStyles();

  return (
    <Grid item container xs={12}>
      <Typography variant={"h6"}>Control Ganadero</Typography>
      <AnimalDescription />
      <AnimalCharts />
      <AddAnimals />
      <Grid item xs={12} className={classes.registerContainer}>
        <CustomMaterialTable
          data={animalsList}
          columns={[
            ...columnsToCustomMaterialTable,
            {
              field: "actions",
              title: "Acciones",
              render: (rowData) => (
                <>
                  {/* <Link to={routesDictionary.livestockControl + "testId"}> */}
                  <IconButton
                    style={{ color: "#C25560" }}
                    size="small"
                    aria-label="edit"
                  >
                    <Visibility fontSize="small" />
                  </IconButton>
                  {/* </Link> */}
                  <IconButton
                    style={{ color: "#C25560" }}
                    size="small"
                    aria-label="edit"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    style={{ color: "#C25560" }}
                    size="small"
                    aria-label="delete"
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </>
              ),
            },
            {
              field: "outstanding",
              title: "",
              render: (data) => (
                <>
                  <IconButton
                    style={{ color: "#C25560" }}
                    size="small"
                    aria-label="delete"
                    onClick={() => {
                      console.log(data);
                      data.outstanding = !data.outstanding;
                      setAnimalsList(data);
                    }}
                  >
                    {data.outstanding === false && <Star fontSize="small" />}
                    {data.outstanding === true && (
                      <StarBorder fontSize="small" />
                    )}
                  </IconButton>
                </>
              ),
            },
          ]}
        />
      </Grid>
    </Grid>
  );
}
export default AnimalControlPage;
