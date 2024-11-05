// src/components/MonthlyIndividualIncentiveChart.jsx

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const MonthlyIndividualIncentiveChart = () => {
  const chartRef = useRef(null);

  // Sample data for individual employee efficiencies
  const employeeData = [
    { name: 'N V Reddy', efficiency: 110 },
    { name: 'Manjunath', efficiency: 115 },
    { name: 'Ranganna', efficiency: 105 },
    { name: 'Ranjan', efficiency: 130 },
    { name: 'Gangadhar', efficiency: 100 },
    { name: 'Suresh', efficiency: 125 },
    { name: 'Deepak', efficiency: 115 },
    { name: 'Sanjay', efficiency: 120 },
    { name: 'Ram', efficiency: 90 },
    { name: 'Amit', efficiency: 102 },
  ];

  // Incentive structure based on efficiency
  const incentiveLookup = {
    101: 1000,
    102: 1066,
    103: 1133,
    104: 1200,
    105: 1266,
    106: 1366,
    107: 1433,
    108: 1500,
    109: 1566,
    110: 1633,
    111: 1733,
    112: 1833,
    113: 1933,
    114: 2033,
    115: 2133,
    116: 2233,
    117: 2333,
    118: 2433,
    119: 2533,
    120: 2633,
    121: 2766,
    122: 2900,
    123: 3033,
    124: 3166,
    125: 3300,
    126: 3433,
    127: 3566,
    128: 3700,
    129: 3833,
    130: 3966,
  };

  // Calculate incentives for eligible employees
  const eligibleEmployees = employeeData
    .filter(emp => emp.efficiency >= 101 && emp.efficiency <= 130)
    .map(emp => {
      const incentive = incentiveLookup[emp.efficiency] || 0; // Get incentive based on efficiency
      return {
        name: emp.name,
        efficiency: emp.efficiency,
        incentive: incentive.toFixed(2), // Format incentive
      };
    });

  // Bar Chart Option
  const option = {
    title: {
      text: 'Monthly Individual Incentives (Eligible Criteria: 101% to 130%)',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        // Extract the employee data from the first parameter
        const employee = params[0].data;
        return `${employee.name}: ${employee.value}% Efficiency<br/>Incentive: ₹${employee.incentive}`;
      },
    },
    xAxis: {
      type: 'category',
      data: eligibleEmployees.map(emp => emp.name),
      axisLabel: { rotate: 30 }, // Rotate labels for better visibility
    },
    yAxis: {
      type: 'value',
      name: 'Efficiency (%)',
      max: 140,
    },
    series: [
      {
        name: 'Efficiency',
        type: 'bar',
        data: eligibleEmployees.map(emp => ({
          value: emp.efficiency,  // This is used for the Y-axis value
          name: emp.name,         // Used for the X-axis label
          incentive: emp.incentive, // Attach incentive to the data
        })),
        itemStyle: { color: '#4CAF50' }, // Set bar color
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
      <h2 className="text-xl font-bold mb-4">Monthly Individual Incentives</h2>
      <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default MonthlyIndividualIncentiveChart;
