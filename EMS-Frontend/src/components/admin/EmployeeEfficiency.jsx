import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const EmployeeEfficiency = () => {
  const data = [];

  // Generate employees data (same as before)
  for (let i = 1; i <= 50; i++) {
    data.push({
      name: `Employee ${i}`,
      individualEfficiency: Math.floor(Math.random() * (70 - 50 + 1)) + 50,
      avgGroupEfficiency: Math.floor(Math.random() * (70 - 50 + 1)) + 50,
      outputAchievement: Math.floor(Math.random() * 100) + 40
    });
  }

  for (let i = 51; i <= 120; i++) {
    data.push({
      name: `Employee ${i}`,
      individualEfficiency: Math.floor(Math.random() * (100 - 71 + 1)) + 71,
      avgGroupEfficiency: Math.floor(Math.random() * (100 - 71 + 1)) + 71,
      outputAchievement: Math.floor(Math.random() * 100) + 60
    });
  }

  for (let i = 121; i <= 150; i++) {
    data.push({
      name: `Employee ${i}`,
      individualEfficiency: Math.floor(Math.random() * (130 - 101 + 1)) + 101,
      avgGroupEfficiency: Math.floor(Math.random() * (130 - 101 + 1)) + 101,
      outputAchievement: Math.floor(Math.random() * 100) + 70
    });
  }

  const ranges = [
    { label: '50% to 70%', min: 50, max: 70, color: '#8884d8' },
    { label: '71% to 100%', min: 71, max: 100, color: '#82ca9d' },
    { label: '101% to 130%', min: 101, max: 130, color: '#ffc658' },
    { label: 'All', min: 0, max: 140, color: '#000000' } // Default color for "All"
  ];

  // Set the initial state to "All" filter
  const [selectedRange, setSelectedRange] = useState(ranges[0]);

  const filteredData = data.filter(employee => 
    employee.individualEfficiency >= selectedRange.min && 
    employee.individualEfficiency <= selectedRange.max
  );

  // Function to count employees in each efficiency range
  const countEmployeesInRanges = () => {
    return ranges.map(range => ({
      label: range.label,
      count: data.filter(employee => 
        employee.individualEfficiency >= range.min && 
        employee.individualEfficiency <= range.max
      ).length
    }));
  };

  const rangeCounts = countEmployeesInRanges();

  return (
    <div className="flex flex-col p-2 sm:p-4 md:p-6 lg:p-8 h-full">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 w-full">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 text-center">
          Employee Efficiency Overview
        </h1>

        {/* Filtering Options */}
        <div className="mb-4 text-center">
          <label className="mr-2 font-medium">Filter by Efficiency:</label>
          {ranges.map(range => (
            <button
              key={range.label}
              onClick={() => setSelectedRange(range)}
              className={`mr-2 px-4 py-2 rounded ${selectedRange.label === range.label ? 'bg-persian-green-500 text-white' : 'bg-gray-200'}`}
            >
              {range.label}
            </button>
          ))}
        </div>

        <div className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredData}
              margin={{ top: 20, right: 10, left: 10, bottom: 50 }}
              barGap={2}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-30}
                textAnchor="end"
                interval={0}
                height={60}
                fontSize={10}
              />
              <YAxis domain={[0, 140]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Bar
                dataKey="individualEfficiency"
                name="Individual Efficiency (%)"
                fill="#8884d8"
              />
              <Bar
                dataKey="avgGroupEfficiency"
                name="Avg Group Efficiency (%)"
                fill="#82ca9d"
              />
              <Bar
                dataKey="outputAchievement"
                name="Output Achievement"
                fill="#ffc658"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Display employee counts for each range with centered text and color alignment */}
        <div className="mt-4 text-center">
          {rangeCounts.map(({ label, count }) => {
            const range = ranges.find(r => r.label === label);
            return (
              <div key={label} className="font-medium" style={{ color: range.color }}>
                {label}: {count} {count === 1 ? 'employee' : 'employees'}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmployeeEfficiency;
