import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import { useMediaQuery } from 'react-responsive';

ChartJS.register(ArcElement, ChartTooltip, Legend);

const UserDashboard = () => {
  const [jobCards, setJobCards] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [incompleteCount, setIncompleteCount] = useState(0);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    const fetchedJobCards = [
      { id: 1, status: 'Complete' },
      { id: 2, status: 'Incomplete' },
      { id: 3, status: 'Complete' },
      { id: 4, status: 'Incomplete' },
    ];

    setJobCards(fetchedJobCards);

    const completed = fetchedJobCards.filter(card => card.status === 'Complete').length;
    const incomplete = fetchedJobCards.filter(card => card.status === 'Incomplete').length;

    setCompletedCount(completed);
    setIncompleteCount(incomplete);
  }, []);

  const jobCardData = {
    labels: ['Complete', 'Incomplete'],
    datasets: [
      {
        data: [completedCount, incompleteCount],
        backgroundColor: ['#66BB6A', '#EF5350'],
        hoverBackgroundColor: ['#388E3C', '#D32F2F'],
      },
    ],
  };

  const efficiencyData = {
    labels: ['Daily', 'Weekly', 'Monthly'],
    datasets: [
      {
        data: [70, 85, 90],
        backgroundColor: ['#42A5F5', '#FFCA28', '#FF7043'],
        hoverBackgroundColor: ['#1E88E5', '#FBC02D', '#F4511E'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: isMobile,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#333', // Darker background
        titleColor: '#fff', // White title text
        bodyColor: '#eee', // Light body text
        borderColor: '#666', // Border color
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(2); // Calculate percentage
            return `${label}: ${value} (${percentage}%)`; // Show value and percentage
          },
        },
      },
    },
    layout: {
      padding: isMobile ? 10 : 0,
    },
    elements: {
      arc: {
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    },
  };

  return (
    // <div className="flex flex-col items-center h-full p-4">
    //   <h1 className="text-3xl font-bold mb-4 text-center text-persian-green-950">User Dashboard</h1>
      
    //   <div className="flex flex-col md:flex-row md:justify-center md:space-x-4 space-y-4 md:space-y-0 mt-4 w-full max-w-4xl">
        
    //     {/* Job Card Status Summary */}
    //     <div className="p-4 border rounded-lg shadow-md bg-white bg-gray-50 flex-1 min-w-0">
    //       <div className="bg-persian-green-800 text-white p-2 rounded-lg">
    //         <h2 className="text-xl font-bold text-center">Job Card Status Summary</h2>
    //       </div>
    //       <div className="flex justify-center items-center p-4" style={{ height: isMobile ? '200px' : '250px', width: '100%' }}>
    //         <Pie
    //           data={jobCardData}
    //           options={chartOptions}
    //           width={isMobile ? 200 : 300}
    //           height={isMobile ? 200 : 300}
    //         />
    //       </div>
    //     </div>

    //     {/* Efficiency Summary */}
    //     <div className="p-4 border rounded-lg shadow-md bg-white bg-gray-50 flex-1 min-w-0">
    //       <div className="bg-persian-green-800 text-white p-2 rounded-lg">
    //         <h2 className="text-xl font-bold text-center">Efficiency Summary</h2>
    //       </div>
    //       <div className="flex justify-center items-center p-4" style={{ height: isMobile ? '200px' : '250px', width: '100%' }}>
    //         <Pie
    //           data={efficiencyData}
    //           options={chartOptions}
    //           width={isMobile ? 200 : 300}
    //           height={isMobile ? 200 : 300}
    //         />
    //       </div>
    //     </div>

    //   </div>
    // </div>

    <div className="flex flex-col items-center bg-gray-100 w-full h-full p-4">
    <h1 className="text-3xl font-bold mb-4 text-center text-persian-green-950">User Dashboard</h1>
    
    <div className="flex flex-col md:flex-row md:justify-center md:space-x-4 space-y-4 md:space-y-0 mt-4 w-full max-w-4xl">
      
      {/* Job Card Status Summary */}
      <div className="p-4 border rounded-lg shadow-md bg-white bg-gray-50 flex-1 min-w-0">
        <div className="bg-persian-green-800 text-white p-2 rounded-lg">
          <h2 className="text-xl font-semibold text-center">Job Card Status Summary</h2>
        </div>
        <div className="flex justify-center items-center p-4" style={{ height: isMobile ? '200px' : '250px', width: '100%' }}>
          <Pie
            data={jobCardData}
            options={chartOptions}
            width={isMobile ? 200 : 300}
            height={isMobile ? 200 : 300}
          />
        </div>
        {/* Display values and percentages below the pie chart */}
        <div className="text-center mt-2">
          <p className="text-lg text-green-600">Complete: {completedCount} ({((completedCount / (completedCount + incompleteCount)) * 100).toFixed(2)}%)</p>
          <p className="text-lg text-red-600">Incomplete: {incompleteCount} ({((incompleteCount / (completedCount + incompleteCount)) * 100).toFixed(2)}%)</p>
        </div>
      </div>

      {/* Efficiency Summary */}
      <div className="p-4 border rounded-lg shadow-md bg-white bg-gray-50 flex-1 min-w-0">
        <div className="bg-persian-green-800 text-white p-2 rounded-lg">
          <h2 className="text-xl font-semibold text-center">Efficiency Summary</h2>
        </div>
        <div className="flex justify-center items-center p-4" style={{ height: isMobile ? '200px' : '250px', width: '100%' }}>
          <Pie
            data={efficiencyData}
            options={chartOptions}
            width={isMobile ? 200 : 300}
            height={isMobile ? 200 : 300}
          />
        </div>
        {/* Display values and percentages below the pie chart */}
        <div className="text-center mt-2">
          <p className="text-lg text-blue-600">Daily: {efficiencyData.datasets[0].data[0]} ({efficiencyData.datasets[0].data[0]}%)</p>
          <p className="text-lg text-yellow-600">Weekly: {efficiencyData.datasets[0].data[1]} ({efficiencyData.datasets[0].data[1]}%)</p>
          <p className="text-lg text-orange-600">Monthly: {efficiencyData.datasets[0].data[2]} ({efficiencyData.datasets[0].data[2]}%)</p>
        </div>
      </div>

    </div>
  </div>
  );
};

export default UserDashboard;
