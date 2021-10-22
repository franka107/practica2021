import React from "react";
import { Grid, Typography } from "@material-ui/core";
import QRCode from "qrcode.react";

const QrForm = () => {
  return (
    <Grid>
      <Typography variant={"h6"} gutterBottom>
        Codigo QR
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        xs={5}
        style={{ margin: "auto" }}
      >
        <QRCode
          renderAs="svg"
          value={window.location.href}
          style={{ width: "100%", height: "100%" }}
          includeMargin={true}
        />
      </Grid>
    </Grid>
  );
};

export default QrForm;
