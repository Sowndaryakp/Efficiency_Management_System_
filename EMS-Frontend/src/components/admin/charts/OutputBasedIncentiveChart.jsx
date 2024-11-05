// src/components/OutputBasedIncentiveChart.jsx

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const OutputBasedIncentiveChart = () => {
  const chartRef = useRef(null);

  // Sample data for output percentages per team (added new data)
  const outputData2021 = [
    { team: 'Team A', output: 90 },
    { team: 'Team B', output: 82 },
    { team: 'Team C', output: 88 },
    { team: 'Team D', output: 95 },
    { team: 'Team E', output: 100 },
    { team: 'Team F', output: 78 },
  ];

  const outputData2023 = [
    { team: 'Team A', output: 93 },
    { team: 'Team B', output: 107 },
    { team: 'Team C', output: 91 },
    { team: 'Team D', output: 96 },
    { team: 'Team E', output: 110 },
    { team: 'Team F', output: 85 },
  ];

  // New data for additional output percentages
  const additionalOutputData2021 = [
    85.0, 90.0, 85.5, 90.5, 86.0, 91.0, 86.5, 91.5, 87.0, 92.0,
    87.5, 92.5, 88.0, 93.0, 88.5, 93.5, 89.0, 94.0, 89.5, 94.5,
    90.0, 95.0, 90.5, 96.0, 91.0, 96.5, 92.0, 97.0, 92.5, 97.5,
    93.0, 98.0, 93.5, 98.5, 94.0, 99.0, 94.5, 99.5, 95.0, 100.0,
    95.5, 100.5, 96.0, 101.0, 96.5, 101.5, 97.0, 102.0, 97.5, 102.5,
    98.0, 103.0, 98.5, 103.5, 99.0, 104.0, 99.5, 104.5, 100.0, 105.0
  ];

  const efficiencyData = [
    101, 102, 103, 104, 105, 106, 107, 108, 109, 110,
    111, 112, 113, 114, 115, 116, 117, 118, 119, 120,
    121, 122, 123, 124, 125, 126, 127, 128, 129, 130
  ];

  // Calculate incentives for each year based on criteria
  const calculateIncentives = (data, year) => {
    return data.map(item => {
      let incentive = 0;
      if (year === 2021) {
        if (item.output >= 85 && item.output <= 100) {
          incentive = (item.output - 85) * 0.25; // 25% for outputs between 85% and 100%
        }
      } else if (year === 2023) {
        if (item.output >= 90 && item.output <= 105) {
          incentive = (item.output - 90) * 0.25; // 25% for outputs between 90% and 105%
        }
      }
      return {
        ...item,
        incentive: incentive.toFixed(2), // Convert to string with two decimal places
      };
    });
  };

  const eligibleIncentives2021 = calculateIncentives(outputData2021, 2021);
  const eligibleIncentives2023 = calculateIncentives(outputData2023, 2023);

  // Combine data for chart representation
  const combinedData = [
    { year: 2021, data: eligibleIncentives2021.concat(additionalOutputData2021.map((output, index) => ({ team: `Output ${index + 1}`, output })) ) },
    { year: 2023, data: eligibleIncentives2023 },
  ];

  // Chart Options
  const option = {
    title: {
      text: 'Output Based Incentives',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        const { data } = params; // Get the data object
        const team = data.team || 'Unknown Team'; // Fallback if team is not found
        const output = data.output || 'N/A'; // Fallback if output is not found
        const incentive = data.incentive || '0.00'; // Fallback if incentive is not found
        return `${team}<br/>Output: ${output}%<br/>Incentive: ₹${incentive}`;
      },
    },
    xAxis: {
      type: 'category',
      data: combinedData.flatMap(yearData => yearData.data.map(item => `${item.team} (${yearData.year})`)), // Combine team names with year
      axisLabel: { rotate: 30 }, // Rotate labels for better visibility
    },
    yAxis: {
      type: 'value',
      name: 'Incentive (₹)',
      max: Math.max(...combinedData.flatMap(yearData => yearData.data.map(item => parseFloat(item.incentive)))) + 10, // Dynamically set the max
    },
    series: [
      {
        name: 'Incentive',
        type: 'bar',
        data: combinedData.flatMap(yearData => yearData.data.map(item => ({
          value: item.incentive, // Use incentive as the Y-axis value
          team: item.team,
          output: item.output,
        }))),
        itemStyle: { color: '#FF9800' }, // Set bar color
      },
    ],
  };

  // Initialize chart
  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);
    chartInstance.setOption(option);
    window.addEventListener('resize', () => chartInstance.resize());
    return () => {
      window.removeEventListener('resize', () => chartInstance.resize());
      chartInstance.dispose();
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center w-full md:w-1/2">
      <h2 className="text-xl font-bold mb-4">Output Based Incentives</h2>
      <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default OutputBasedIncentiveChart;
