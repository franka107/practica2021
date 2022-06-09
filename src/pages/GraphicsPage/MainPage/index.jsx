import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import Won from "../Won";
import Production from "../Production";
import Reproduction from "../Reproduction";
import { useDispatch, useSelector } from "react-redux";
import GraphicActions from "../../../redux/actions/graphic.actions";
import MilkGraphicActions from "../../../redux/actions/milkGraphic.actions";
import { sub } from "date-fns";
import AnimalActions from "../../../redux/actions/animal.actions";
import AnimalDescription from "../../AnimalControl/AnimalDescription";
// import { Formik } from "formik";
// import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
// import ButtonFormik from "../../../components/Inputs/ButtonFormik";

const defaultInitValues = {
  initDate: sub(new Date(), { months: 1 }),
  endDate: new Date(),
};

const MainPage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.graphic.current);
  const milkControlCharts = useSelector((state) => state.milkGraphic.current);
  const animalList = useSelector((state) => state.animal.list);

  useEffect(() => {
    if (!data) {
      dispatch(GraphicActions.get());
    }
    if (!milkControlCharts) {
      dispatch(MilkGraphicActions.get(defaultInitValues));
    }
    if (!animalList || animalList.length === 0) {
      dispatch(AnimalActions.list());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const submit = (values) => {
  //   dispatch(MilkGraphicActions.get(values));
  // };

  return (
    <Grid item xs={12} justifyContent={"center"}>
      <AnimalDescription />
      <br />
      <br />
      {data && <Won />}
      <br />
      <br />
      {milkControlCharts && (
        <>
          <Production>
            {/* <Formik
              initialValues={defaultInitValues}
              onSubmit={submit}
              enableReinitialize
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <Grid item container xs={12} justifyContent="space-evenly">
                    <DatePickerFieldFormik
                      label="Desde"
                      name="initDate"
                      onChange={props.handleChange}
                      sm={4}
                      xs={12}
                    />
                    <DatePickerFieldFormik
                      label="Hasta"
                      name="endDate"
                      onChange={props.handleChange}
                      sm={4}
                      xs={12}
                    />
                    <Grid item xs={3}>
                      <ButtonFormik
                        xs={12}
                        label="Buscar"
                        type="submit"
                        style={{ margin: 5 }}
                      />
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik> */}
          </Production>
          <br />
          <br />
          <Reproduction />
        </>
      )}
    </Grid>
  );
};

export default MainPage;
