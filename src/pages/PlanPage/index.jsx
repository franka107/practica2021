import React from "react";
import { Grid } from "@material-ui/core";
import PlanCard from "../../components/PlanCard";
import { plans } from "./constants";
// import { useStyles } from "./styles";

function PlanPage() {
  // const classes = useStyles();

  return (
    <div
      style={{
        overflowY: "scroll",
        height: "calc(100vh - 4.2rem)",
        marginTop: "4.2rem",
        padding: "2rem 2.5rem 2.5rem",
        position: "relative",
      }}
    >
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
    </div>
  );
}

export default PlanPage;
