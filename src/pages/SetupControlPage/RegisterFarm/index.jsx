import React, { useState } from "react";
import ConfigureFarm from "../../../components/ConfigureFarm";
import { coinOptions } from "../constants";

function RegisterFarm({
  sections,
  handleSubmit,
  setRegisterStep,
  farmId,
  setCurrency,
  setFarmId,
}) {
  const [errors, setErrors] = useState([]);

  const registerFarm = (values) => {
    const phoneFormat =
      values.phoneNumber === "+"
        ? values.phoneNumber.replace("+", "")
        : values.phoneNumber;
    const inoutValues = {
      name: values.name,
      landLord: values.owner,
      country: values.country,
      region: values.region,
      district: values.district,
      address: values.address,
      phoneNumber: phoneFormat,
      nit: values.ruc,
      areaUnit: values.areaUnit,
      weightUnit: values.weightUnit,
      capacityUnit: values.capacityUnit,
      currency: values.coin,
    };

    if (farmId) {
      inoutValues.id = farmId;
    }

    //addFarm({
    //  variables: {
    //    input: {
    //      ...inoutValues
    //    }
    //  }
    //}).then(({data}) => {
    //  const {errors, id} = data.createFarm;
    //  if (!errors) {
    //    const coinAbbr = coinOptions.filter(coin => coin.id === parseInt(values.coin, 10));

    //    setCurrency(coinAbbr[0].name);
    //    setRegisterStep(1);
    //    setFarmId(id);
    //  } else {
    //    setErrors([{
    //      name: 'phoneNumber',
    //      message: errors[0].messages[0]
    //    }]);
    //  }
    //});
  };

  return (
    <ConfigureFarm
      sections={sections}
      handleNext={(value) => handleSubmit(value, registerFarm)}
      errors={errors}
    />
  );
}

export default RegisterFarm;
