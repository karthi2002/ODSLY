const successRateData = {
  chart: {
    labels: ['NBA', 'MLB', 'NFL', 'Parlays'],
    datasets: [
      {
        data: [85, 51, 65, 20],
        colors: [
          (opacity = 1) => `#997AFC`,     
          (opacity = 1) => `#4B92E5`,     
          (opacity = 1) => `#32ACAC`,     
          (opacity = 1) => `#DA62C4`,    
        ],
      },
    ],
  },
};

export default successRateData;