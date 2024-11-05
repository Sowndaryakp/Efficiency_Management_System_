// src/components/MonthlyGroupIncentiveChart.jsx

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const MonthlyGroupIncentiveChart = () => {
  const chartRef = useRef(null);

  // Sample data for employee efficiencies, grouped by department and trade
  const employeeData = [
    { name: 'N V Reddy', efficiency: 110, department: 'Sales', trade: 'A' },
    { name: 'Manjunath', efficiency: 115, department: 'Sales', trade: 'A' },
    { name: 'Ranganna', efficiency: 105, department: 'HR', trade: 'B' },
    { name: 'Ranjan', efficiency: 130, department: 'HR', trade: 'B' },
    { name: 'Gangadhar', efficiency: 100, department: 'IT', trade: 'C' },
    { name: 'Suresh', efficiency: 125, department: 'IT', trade: 'C' },
    { name: 'Deepak', efficiency: 115, department: 'HR', trade: 'B' },
    { name: 'Sanjay', efficiency: 120, department: 'Sales', trade: 'A' },
    { name: 'Ram', efficiency: 90, department: 'IT', trade: 'C' },
    { name: 'Amit', efficiency: 102, department: 'Sales', trade: 'A' },
  ];

  // Group employees by department and calculate the average efficiency
  const groupIncentives = employeeData.reduce((acc, emp) => {
    const key = `${emp.department}-${emp.trade}`;
    if (!acc[key]) {
      acc[key] = { totalEfficiency: 0, count: 0, members: [] };
    }
    acc[key].totalEfficiency += emp.efficiency;
    acc[key].count += 1;
    acc[key].members.push(emp);
    return acc;
  }, {});

  // Monthly Group Incentive Part II Data Mapping
  const incentiveMapping = {
    101: 500,
    102: 534,
    103: 567,
    104: 600,
    105: 634,
    106: 684,
    107: 717,
    108: 750,
    109: 784,
    110: 817,
    111: 867,
    112: 917,
    113: 967,
    114: 1017,
    115: 1067,
    116: 1117,
    117: 1167,
    118: 1217,
    119: 1267,
    120: 1317,
    121: 1384,
    122: 1450,
    123: 1517,
    124: 1584,
    125: 1650,
    126: 1717,
    127: 1784,
    128: 1850,
    129: 1917,
    130: 1984,
  };

  // Calculate average efficiency and determine incentives
  const eligibleGroups = Object.entries(groupIncentives)
    .map(([key, value]) => {
      const averageEfficiency = value.totalEfficiency / value.count;
      let incentive = 0;

      // Determine incentive based on average efficiency
      if (averageEfficiency >= 101 && averageEfficiency <= 130) {
        const roundedEfficiency = Math.round(averageEfficiency);
        incentive = incentiveMapping[roundedEfficiency] || 0; // Default to 0 if no match found
      }

      return {
        group: key.replace('-', ' - '), // Change format of the group name (optional)
        averageEfficiency: averageEfficiency.toFixed(2),
        incentive: incentive.toFixed(2),
      };
    })
    .filter(group => group.averageEfficiency >= 101 && group.averageEfficiency <= 130);

  // Bar Chart Option
  const option = {
    title: {
      text: 'Monthly Group Incentives (Eligible Criteria: 101% to 130% of Group Average Efficiency)',
      left: 'center',
    },
    tooltip: {
      trigger: 'item', // Changed to 'item' for better tooltip access
      formatter: (params) => {
        const { group, averageEfficiency, incentive } = params.data; // Destructure directly from params.data
        return `${group}<br/>Average Efficiency: ${averageEfficiency}%<br/>Incentive: ₹${incentive}`;
      },
    },
    xAxis: {
      type: 'category',
      data: eligibleGroups.map(group => group.group),
      axisLabel: { rotate: 30 }, // Rotate labels for better visibility
    },
    yAxis: {
      type: 'value',
      name: 'Efficiency (%)',
      max: 140,
    },
    series: [
      {
        name: 'Average Efficiency',
        type: 'bar',
        data: eligibleGroups.map(group => ({
          value: group.averageEfficiency, // This is used for the Y-axis value
          group: group.group,               // Used for the X-axis label
          averageEfficiency: group.averageEfficiency, // Attach average efficiency to the data
          incentive: group.incentive,       // Attach incentive to the data
        })),
        itemStyle: { color: '#2196F3' }, // Set bar color
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
      <h2 className="text-xl font-bold mb-4">Monthly Group Incentives</h2>
      <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default MonthlyGroupIncentiveChart;
