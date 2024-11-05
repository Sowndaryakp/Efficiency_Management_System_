// src/components/JobCardCompletionStatusChart.jsx

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const JobCardCompletionStatusChart = () => {
  // Sample job card data
  const completedCount = 200; // Completed job card count
  const incompleteCount = 100; // Incomplete job card count
  const totalCount = completedCount + incompleteCount;

  const chartRef = useRef(null);

  // Pie Chart Option
  const option = {
    title: {
    //   text: 'Job Card Completion Status',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        const total = completedCount + incompleteCount;
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
          { value: completedCount, name: 'Completed', itemStyle: { color: '#7699ba' } }, // Green
          { value: incompleteCount, name: 'Incomplete', itemStyle: { color: '#ffbc1b' } }, // Orange
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
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center w-full md:w-2/6 lg:w-1/3">
      <h2 className="text-xl font-bold mb-4">Job Card Completion Status</h2>
      <div ref={chartRef} style={{ width: '100%', height: '300px' }} />
       {/* Display values and percentages below the pie chart */}
       <div className="text-center mt-2">
          <p className="text-lg text-blue-900">Completed: {completedCount} ({((completedCount / (completedCount + incompleteCount)) * 100).toFixed(2)}%)</p>
          <p className="text-lg text-yellow-500">Incomplete: {incompleteCount} ({((incompleteCount / (completedCount + incompleteCount)) * 100).toFixed(2)}%)</p>
          <p className="text-lg text-bold">Total: {totalCount}</p>
        </div>
    </div>
  );
};

export default JobCardCompletionStatusChart;
