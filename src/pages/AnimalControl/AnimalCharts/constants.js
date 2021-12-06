import { getGroupedByHerdDate } from "../../../helpers/chartsFunctions";

export const chartData = [];

export const chartOptions = {
  chart: {
    type: "pie",
    options3d: {
      enabled: true,
      alpha: 45,
    },
  },
  title: {
    text: "GRÁFICO DE DENSIDAD: ",
  },
  subtitle: {
    text: "CRÍAS MACHOS, CRÍAS HEMBRAS Y ABORTOS  - AÑO 2021",
  },
  plotOptions: {
    pie: {
      innerSize: 100,
      depth: 45,
    },
  },
  series: [
    {
      name: "Delivered amount",
      data: [
        ["Crías Hembras", 8],
        ["Crías Machos", 12],
        ["Abortos", 3],
      ],
    },
  ],
  credits: {
    enabled: false,
  },
};

export const renderChartDetailOptions = (animalList) => ({
  chart: {
    type: "spline",
  },
  title: {
    text: "NÚMERO DE ANIMALES",
  },

  xAxis: {
    title: {
      text: "Entrada hato",
    },
    categories: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
  },
  yAxis: {
    title: {
      text: "Unidades",
    },
    labels: {
      formatter: function () {
        return this.value;
      },
    },
  },
  tooltip: {
    crosshairs: true,
    shared: true,
  },
  plotOptions: {
    spline: {
      marker: {
        radius: 4,
        lineColor: "#666666",
        lineWidth: 1,
      },
    },
  },
  series: [
    {
      name: "Número total de animales",
      marker: {
        symbol: "diamond",
      },
      data: getGroupedByHerdDate(animalList),
    },
  ],
  credits: {
    enabled: false,
  },
});

export const renderChartDetail2Options = () => ({
  chart: {
    type: "spline",
  },
  title: {
    text: "VACAS EN PRODUCCION",
  },

  xAxis: {
    title: {
      text: "Entrada hato",
    },
    categories: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
  },
  yAxis: {
    title: {
      text: "Unidades",
    },
    labels: {
      formatter: function () {
        return this.value;
      },
    },
  },
  tooltip: {
    crosshairs: true,
    shared: true,
  },
  plotOptions: {
    spline: {
      marker: {
        radius: 4,
        lineColor: "#666666",
        lineWidth: 1,
      },
    },
  },
  series: [
    {
      name: "Vacas en producción",
      marker: {
        symbol: "diamond",
      },
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
  credits: {
    enabled: false,
  },
});
export const renderChartDetail3Options = () => ({
  chart: {
    type: "spline",
  },
  title: {
    text: "NOVILLAS EN VIENTRE",
  },

  xAxis: {
    title: {
      text: "Entrada hato",
    },
    categories: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
  },
  yAxis: {
    title: {
      text: "Unidades",
    },
    labels: {
      formatter: function () {
        return this.value;
      },
    },
  },
  tooltip: {
    crosshairs: true,
    shared: true,
  },
  plotOptions: {
    spline: {
      marker: {
        radius: 4,
        lineColor: "#666666",
        lineWidth: 1,
      },
    },
  },
  series: [
    {
      name: "Novillas en vientre",
      marker: {
        symbol: "diamond",
      },
      data: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
  credits: {
    enabled: false,
  },
});
export const renderChartDetail4Options = () => ({
  chart: {
    type: "spline",
  },
  title: {
    text: "PARTOS PROGRAMADOS",
  },

  xAxis: {
    title: {
      text: "Entrada hato",
    },
    categories: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
  },
  yAxis: {
    title: {
      text: "Unidades",
    },
    labels: {
      formatter: function () {
        return this.value;
      },
    },
  },
  tooltip: {
    crosshairs: true,
    shared: true,
  },
  plotOptions: {
    spline: {
      marker: {
        radius: 4,
        lineColor: "#666666",
        lineWidth: 1,
      },
    },
  },
  series: [
    {
      name: "Partos programados",
      marker: {
        symbol: "diamond",
      },
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
  credits: {
    enabled: false,
  },
});
export const renderChartDetail5Options = () => ({
  chart: {
    type: "spline",
  },
  title: {
    text: "VACAS SECAS",
  },

  xAxis: {
    title: {
      text: "Entrada hato",
    },
    categories: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
  },
  yAxis: {
    title: {
      text: "Unidades",
    },
    labels: {
      formatter: function () {
        return this.value;
      },
    },
  },
  tooltip: {
    crosshairs: true,
    shared: true,
  },
  plotOptions: {
    spline: {
      marker: {
        radius: 4,
        lineColor: "#666666",
        lineWidth: 1,
      },
    },
  },
  series: [
    {
      name: "Vacas secas",
      marker: {
        symbol: "diamond",
      },
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
  credits: {
    enabled: false,
  },
});
export const renderChartDetail6Options = () => ({
  chart: {
    type: "spline",
  },
  title: {
    text: "NOVILLAS PROXIMAS AL PARTO",
  },

  xAxis: {
    title: {
      text: "Entrada hato",
    },
    categories: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
  },
  yAxis: {
    title: {
      text: "Unidades",
    },
    labels: {
      formatter: function () {
        return this.value;
      },
    },
  },
  tooltip: {
    crosshairs: true,
    shared: true,
  },
  plotOptions: {
    spline: {
      marker: {
        radius: 4,
        lineColor: "#666666",
        lineWidth: 1,
      },
    },
  },
  series: [
    {
      name: "Novillas próximas al parto",
      marker: {
        symbol: "diamond",
      },
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
  credits: {
    enabled: false,
  },
});
