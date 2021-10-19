import { getGroupedByHerdDate } from "../../../helpers/chartsFunctions";

export const chartData = [
  {
    id: 6,
    text: "Novillas próximas de parto",
    percentage: 25,
    renderNumber: (animalList) => 12,
  },
];

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
