export const searchForm = (gender = "", setGender) => {
  const genderForm = [
    {
      name: "gender",
      label: "",
      type: "radioBtn",
      items: [
        {
          id: "MA",
          title: "Macho",
        },
        {
          id: "FE",
          title: "Hembra",
        },
      ],
      onChange: (value) => setGender(value),
      size: { xs: 12 },
    },
  ];

  if (gender === "MA") {
    genderForm.push({
      name: "category",
      label: "Categoría",
      type: "radioBtn",
      items: [
        {
          id: "1",
          title: "Reproductor",
        },
        {
          id: "2",
          title: "No reproductor",
        },
      ],
      size: { xs: 12 },
    });
  }

  if (gender === "FE") {
    genderForm.push({
      name: "reproductiveStatus",
      label: "Estado",
      type: "radioBtn",
      items: [
        {
          id: "PRE",
          title: "Preñada",
        },
        {
          id: "VAC",
          title: "Vacía",
        },
      ],
      size: { xs: 12 },
    });
  }

  return genderForm;
};

export const dateForm = (setValuesSubmit) => [
  {
    name: "startDate",
    label: "Desde",
    type: "date",
    onChange: (value) => {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();

      setValuesSubmit([
        {
          name: "endDate",
          value: `${yyyy}-${mm}-${dd}`,
        },
      ]);
    },
    size: { sm: 6, xs: 12 },
  },
  {
    name: "endDate",
    label: "Hasta",
    type: "date",
    size: { sm: 6, xs: 12 },
  },
];
