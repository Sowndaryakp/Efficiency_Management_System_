// src/components/ApprovalStatusPieChart.jsx

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const ApprovalStatusPieChart = () => {
  // Sample job card data for duplication
  const duplicatedCount = 150; // Duplicated job card count
  const uniqueCount = 250;      // Unique job card count
  const totalCount = duplicatedCount + uniqueCount;

  const chartRef = useRef(null);

  // Pie Chart Option
  const option = {
    title: {
      //   text: 'Job Card Summary Duplication',
      //   subtext: 'Unique vs Duplicated',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        const total = duplicatedCount + uniqueCount;
        return `${params.name}: ${params.value} <br />Total: ${total}`;
      },
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Job Card Status',
        type: 'pie',
        radius: '50%',
        data: [
          { value: uniqueCount, name: 'Unique', itemStyle: { color: '#6bbd6e' } }, // Green
          { value: duplicatedCount, name: 'Duplicated', itemStyle: { color: '#ff697e' } }, // Red
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
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
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center w-full md:w-2/6 lg:w-1/3"> {/* Increase width here */}
      <h2 className="text-xl font-bold mb-4">Job Card Duplication Status</h2>
      <div ref={chartRef} style={{ width: '100%', height: '300px' }} /> {/* Keep chart width responsive */}
        {/* Display values and percentages below the pie chart */}
        <div className="text-center mt-2">
          <p className="text-lg text-green-600">Unique: {uniqueCount} ({((uniqueCount / (uniqueCount + duplicatedCount)) * 100).toFixed(2)}%)</p>
          <p className="text-lg text-red-600">Duplicated: {duplicatedCount} ({((duplicatedCount / (uniqueCount + duplicatedCount)) * 100).toFixed(2)}%)</p>
          <p className="text-lg text-bold">Total: {totalCount}</p>
        </div>
    </div>
  );
};

export default ApprovalStatusPieChart;
