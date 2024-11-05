// src/components/TopEmployeeEfficiencyChart.jsx

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const TopEmployeeEfficiencyChart = () => {
  const chartRef = useRef(null);

  // Sample data for top and bottom 10 employee efficiency with unique names
  const topEmployeeData = [
    { name: 'N V Reddy', efficiency: 95 },
    { name: 'Manjunath', efficiency: 92 },
    { name: 'Ranganna', efficiency: 89 },
    { name: 'Ranjan', efficiency: 88 },
    { name: 'Gangadhar', efficiency: 85 },
    { name: 'Suresh', efficiency: 84 },
    { name: 'Deepak', efficiency: 83 },
    { name: 'Sanjay', efficiency: 82 },
    { name: 'Ram', efficiency: 81 },
  ];

  const bottomEmployeeData = [
    { name: 'Amit', efficiency: 50 },
    { name: 'Vijay', efficiency: 52 },
    { name: 'Sunil', efficiency: 54 },
    { name: 'Ravi', efficiency: 56 },
    { name: 'Kiran', efficiency: 57 },
    { name: 'Arjun', efficiency: 59 },
    { name: 'Rajesh', efficiency: 60 },
    { name: 'Harish', efficiency: 61 },
    { name: 'Mohan', efficiency: 63 },
  ];

  // Bar Chart Option with separate grids for top and bottom employees
  const option = {
    title: {
      text: 'Top and Bottom 10 Employee Efficiency',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params) => `${params[0].name}: ${params[0].value}% Efficiency`,
    },
    legend: {
      data: ['Top 10 Employee Efficiency', 'Bottom 10 Employee Efficiency'],
      bottom: 0,
    },
    grid: [
      { left: '5%', right: '55%', top: '20%', bottom: '15%' },  // Grid for top 10
      { left: '55%', right: '5%', top: '20%', bottom: '15%' },   // Grid for bottom 10
    ],
    xAxis: [
      {
        type: 'category',
        data: topEmployeeData.map((emp) => emp.name),
        gridIndex: 0,
        axisLabel: { rotate: 30 },
      },
      {
        type: 'category',
        data: bottomEmployeeData.map((emp) => emp.name),
        gridIndex: 1,
        axisLabel: { rotate: 30 },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Efficiency (%)',
        max: 100,
        gridIndex: 0,
      },
      {
        type: 'value',
        name: 'Efficiency (%)',
        max: 100,
        gridIndex: 1,
      },
    ],
    series: [
      {
        name: 'Top 10 Employee Efficiency',
        type: 'bar',
        data: topEmployeeData.map((emp) => emp.efficiency),
        xAxisIndex: 0,
        yAxisIndex: 0,
        itemStyle: { color: '#557ca2' }, // Green color for top employees
      },
      {
        name: 'Bottom 10 Employee Efficiency',
        type: 'bar',
        data: bottomEmployeeData.map((emp) => emp.efficiency),
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: { color: '#ffda46' }, // Red color for bottom employees
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
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center w-full md:w-6/6">
      <h2 className="text-xl font-bold mb-4">Employee Efficiency</h2>
      <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default TopEmployeeEfficiencyChart;
