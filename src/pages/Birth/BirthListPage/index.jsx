import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useStyles } from "../../../styles";
import CustomMuiTable from "../../../components/CustomMuiTable";
import { shallowEqual, useSelector } from "react-redux";
import SearchContainer from "../../../components/SearchContainer";
import BirthActions from "../../../redux/actions/birth.actions";
import { useDispatch } from "react-redux";
import { columns } from "./constants";
import { useParams } from "react-router";
// import * as yup from "yup";

/**
 * @component
 * @description Componente, tabla que contiene la lista de nacimientos de una vaca
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const BirthListPage = ({ children }) => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState();

  const options = {
    selectableRows: "none",
    search: false,
    searchText,
  };
  const dispatch = useDispatch();

  // const birthList = useSelector((state) => state.birth.list);

  const params = useParams();

  const birthList = useSelector(
    (state) =>
      state.birth.list.filter((e) =>
        params._id ? e.animalId === params._id : e.animalId
      ),
    shallowEqual
  );

  useEffect(() => {
    if (!birthList || birthList.length === 0) {
      dispatch(BirthActions.list());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const numberAbortion = () => {
    const response = birthList.filter((e) => e.birthType === "ABORTION");
    return response.length;
  };

  const numberMale = () => {
    let response = 0;
    const dataFilter = birthList.filter(
      (e) => e.birthType === "SIMPLE" || e.birthType === "TWIN"
    );
    dataFilter.forEach((e) => {
      const male = e.children.filter((e) => e.gender === "MALE");
      response = response + male.length;
    });
    return response;
  };

  const numberFemale = () => {
    let response = 0;
    const dataFilter = birthList.filter(
      (e) => e.birthType === "SIMPLE" || e.birthType === "TWIN"
    );
    dataFilter.forEach((e) => {
      const male = e.children.filter((e) => e.gender === "FEMALE");
      response = response + male.length;
    });
    return response;
  };

  // const initValues = {
  //   initDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  //   finalDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  // };

  // const handleSubmit = () => {};

  // const validationSchema = yup.object({
  //   animalId: yup
  //     .string("Ingresa la identificacion del animal.")
  //     .required("Este campo es requerido."),
  //   controlDate: yup
  //     .date("Ingresa una fecha correcta.")
  //     .max(new Date(), "No puedes poner una fecha futura")
  //     .nullable(),
  // });

  return (
    <Grid container spacing={2}>
      <SearchContainer searchText={searchText} setSearchText={setSearchText} />
      <Grid item xs={12}>
        <CustomMuiTable
          data={birthList.slice(0, 10)}
          columns={columns()}
          options={options}
        />
      </Grid>
      <Grid item xs={12} className={classes.charts}>
        <Typography variant={"subtitle1"} gutterBottom>
          Gráficos
        </Typography>
        <Grid className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Partos</TableCell>
                      <TableCell align="right">Machos</TableCell>
                      <TableCell align="right">Hembras</TableCell>
                      <TableCell align="right">Abortos</TableCell>
                      {/* <TableCell align="right">Promedio IEP</TableCell>
                      <TableCell align="right">
                        Promedio 1er Parto (Meses)
                      </TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="right">{birthList.length}</TableCell>
                      <TableCell align="right">{numberMale()}</TableCell>
                      <TableCell align="right">{numberFemale()}</TableCell>
                      <TableCell align="right">{numberAbortion()}</TableCell>
                      {/* <TableCell align="right">999,999</TableCell>
                      <TableCell align="right">999,999</TableCell> */}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <br />
        </Grid>

        <Grid>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                  chart: {
                    type: "bar",
                    margin: [50, 50, 120, 80],
                  },
                  title: {
                    text: "",
                  },

                  xAxis: {
                    categories: ["Abortos", "Hembas", "Machos"],
                  },
                  yAxis: {
                    min: 0,
                    title: {
                      text: "",
                    },
                  },
                  series: [
                    {
                      type: "bar",
                      colorByPoint: true,
                      data: [numberAbortion(), numberFemale(), numberMale()],
                      showInLegend: false,
                    },
                  ],
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {children()}
    </Grid>
  );
};

export default BirthListPage;
