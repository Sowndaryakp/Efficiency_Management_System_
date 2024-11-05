// src/components/TopEmployeeIncentiveChart.jsx

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const TopEmployeeIncentiveChart = () => {
  const chartRef = useRef(null);

  // Sample data for top 10 employee incentives with unique names
  const topEmployeeData = [
    { name: 'N V Reddy', incentive: 15000 }, // Incentive in INR
    { name: 'Manjunath', incentive: 14000 },
    { name: 'Ranganna', incentive: 13000 },
    { name: 'Ranjan', incentive: 12000 },
    { name: 'Gangadhar', incentive: 11000 },
    { name: 'Suresh', incentive: 10000 },
    { name: 'Deepak', incentive: 9500 },
    { name: 'Sanjay', incentive: 9000 },
    { name: 'Ram', incentive: 8500 },
    { name: 'Ravi', incentive: 8000 },
  ];

  // Bar Chart Option for top employees
  const option = {
    title: {
      text: 'Top 10 Employee Incentives',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params) => `${params[0].name}: ₹${params[0].value}`,
    },
    legend: {
      data: ['Top 10 Employee Incentives'],
      bottom: 0,
    },
    grid: {
      left: '5%',
      right: '5%',
      top: '20%',
      bottom: '15%',
    },
    xAxis: {
      type: 'category',
      data: topEmployeeData.map((emp) => emp.name),
      axisLabel: { rotate: 30 },
    },
    yAxis: {
      type: 'value',
      name: 'Incentive (₹)',
      max: 16000,
    },
    series: [
      {
        name: 'Top 10 Employee Incentives',
        type: 'bar',
        data: topEmployeeData.map((emp) => emp.incentive),
        itemStyle: { color: '#007bff' }, // Blue color for top employees
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
      <h2 className="text-xl font-bold mb-4">Employee Incentives</h2>
      <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default TopEmployeeIncentiveChart;
