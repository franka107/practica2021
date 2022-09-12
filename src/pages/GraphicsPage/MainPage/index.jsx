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
import BirthActions from "../../../redux/actions/birth.actions";
import ZealActions from "../../../redux/actions/zeal.actions";
import PalpationActions from "../../../redux/actions/palpation.actions";
import DryingActions from "../../../redux/actions/drying.actions";
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
  const birthList = useSelector((state) => state.birth.list);
  const listZealControl = useSelector((state) => state.zeal.list);
  const listPalpationControl = useSelector((state) => state.palpation.list);
  const listAnimalDeads = useSelector((state) => state.animal.listDeads);
  const listDryingControl = useSelector((state) => state.drying.list);
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
    if (!birthList || birthList.length === 0) {
      dispatch(BirthActions.list());
    }
    if (!listZealControl || listZealControl.length === 0) {
      dispatch(ZealActions.list());
    }
    if (!listPalpationControl || listPalpationControl.length === 0) {
      dispatch(PalpationActions.list());
    }
    if (!listDryingControl || listDryingControl.length === 0) {
      dispatch(DryingActions.list());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const submit = (values) => {
  //   dispatch(MilkGraphicActions.get(values));
  // };

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
      <Grid item xs={12} justifyContent={"center"}>
        {listAnimalDeads && animalList && (
          <>
            <AnimalDescription />
            <br />
            <br />
            {data && <Won />}
            <br />
            <br />
            {milkControlCharts && listWeightControl && <Production />}
            <br />
            <br />
            {birthList &&
              listWeightControl &&
              ZealActions &&
              listPalpationControl &&
              listDryingControl && <Reproduction />}
          </>
        )}
      </Grid>
    </div>
  );
};

export default MainPage;
