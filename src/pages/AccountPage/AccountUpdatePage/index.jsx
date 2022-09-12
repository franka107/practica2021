import React from "react";
import { Grid, Typography } from "@material-ui/core";
import AccountForm from "../Forms/AccountForm";
import { useSelector } from "react-redux";

/**
 * @component
 * @description Componente, este contiene el formulario de cuenta
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const AccountControlPage = () => {
  const userCurrent = useSelector((state) => state.auth.user);

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
      <Grid container xs={12}>
        <Typography variant={"h6"} gutterBottom>
          Configuración Usuarios
        </Typography>
        <Grid item xs={12}>
          <Grid item xs={12} sm={6}>
            {userCurrent && (
              <AccountForm initValues={{ ...userCurrent, profile: "BASIC" }} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AccountControlPage;
