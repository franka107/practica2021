import React from "react";
import { Grid } from "@material-ui/core";
import PlanCard from "../../components/PlanCard";
import { plans } from "./constants";
// import { useStyles } from "./styles";

function PlanPage() {
  // const classes = useStyles();

  return (
    <Grid container>
      {/* <Typography variant={"h2"} gutterBottom>
        Planes
      </Typography> */}
      <Grid container item justifyContent={"center"} spacing={3}>
        {plans.map((plan) => (
          <Grid item lg={4} md={4} sm={6} xs={12} key={plan.key}>
            <PlanCard plan={plan} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default PlanPage;
