export const chartData = [
  {
    id: 1,
    number: 123,
    text: 'Nro. de animales',
    amountType: 'asc',
    percentage: 25
  },
  {
    id: 2,
    number: 37,
    text: 'Vacas de producción',
    percentage: -2
  },
  {
    id: 3,
    number: 123,
    text: 'Novillas de vientre',
    percentage: 25
  },
  {
    id: 4,
    number: 16,
    text: 'Partos programados',
    percentage: 25
  },
  {
    id: 5,
    number: 37,
    text: 'Vacas secas',
    percentage: -2
  },
  {
    id: 6,
    number: 37,
    text: 'Novillas próximas de parto',
    percentage: 25
  },
];

export const chartOptions = {
  chart: {
    type: 'pie',
    options3d: {
      enabled: true,
      alpha: 45,
    },
  },
  title: {
    text: 'GRÁFICO DE DENSIDAD: '
  },
  subtitle: {
    text: 'CRÍAS MACHOS, CRÍAS HEMBRAS Y ABORTOS  - AÑO 2021'
  },
  plotOptions: {
    pie: {
      innerSize: 100,
      depth: 45
    }
  },
  series: [{
    name: 'Delivered amount',
    data: [
      ['Crías Hembras', 8],
      ['Crías Machos', 12],
      ['Abortos', 3],
    ]
  }],
  credits: {
    enabled: false
  },
};

export const chartDetailOptions = {
  chart: {
    type: 'spline'
  },
  title: {
    text: 'NÚMERO DE ANIMALES'
  },
  subtitle: {
    text: '......................................'
  },
  xAxis: {
    categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  },
  yAxis: {
    title: {
      text: 'Unidades'
    },
    labels: {
      formatter: function () {
        return this.value + '°';
      }
    }
  },
  tooltip: {
    crosshairs: true,
    shared: true
  },
  plotOptions: {
    spline: {
      marker: {
        radius: 4,
        lineColor: '#666666',
        lineWidth: 1
      }
    }
  },
  series: [{
    name: 'Número total de animales',
    marker: {
      symbol: 'diamond'
    },
    data: [{
      y: 3.9,
    }, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
  }],
  credits: {
    enabled: false
  },
};
