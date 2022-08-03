import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import Won from "../Won";
import Production from "../Production";
import Reproduction from "../Reproduction";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import GraphicActions from "../../../redux/actions/graphic.actions";
import MilkGraphicActions from "../../../redux/actions/milkGraphic.actions";
import { sub } from "date-fns";
import AnimalActions from "../../../redux/actions/animal.actions";
import AnimalDescription from "../../AnimalControl/AnimalDescription";
import WeightActions from "../../../redux/actions/weight.actions";
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
  const listAnimalDeads = useSelector((state) => state.animal.listDeads);
  const listWeightControl = useSelector(
    (state) => state.weight.list,
    shallowEqual
  );

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
    if (!listAnimalDeads || listAnimalDeads.length === 0) {
      dispatch(AnimalActions.listDeads());
    }
    if (!listWeightControl || listWeightControl.length === 0) {
      dispatch(WeightActions.list());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const submit = (values) => {
  //   dispatch(MilkGraphicActions.get(values));
  // };

  return (
    <Grid item xs={12} justifyContent={"center"}>
      {listAnimalDeads && animalList && (
        <>
          <AnimalDescription />
          <br />
          <br />
          {data && <Won />}
          <br />
          <br />
          {milkControlCharts && listWeightControl && (
            <>
              <Production />
              <br />
              <br />
              <Reproduction />
            </>
          )}
        </>
      )}
    </Grid>
  );
};

export default MainPage;
