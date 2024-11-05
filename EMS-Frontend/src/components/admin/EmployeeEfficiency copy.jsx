import React from 'react';
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
  const data = [
    {
      name: 'Stormwind K',
      individualEfficiency: 108,
      avgGroupEfficiency: 107,
      outputAchievement: 80
    },
    {
      name: 'Madhusudhanan',
      individualEfficiency: 105,
      avgGroupEfficiency: 106,
      outputAchievement: 75
    },
    {
      name: 'Girish G',
      individualEfficiency: 107,
      avgGroupEfficiency: 108,
      outputAchievement: 82
    },
    {
      name: 'Sathishkumar',
      individualEfficiency: 125,
      avgGroupEfficiency: 118,
      outputAchievement: 80
    },
    {
      name: 'Shashidhar DV',
      individualEfficiency: 118,
      avgGroupEfficiency: 115,
      outputAchievement: 78
    },
    {
      name: 'Krishna Mohan',
      individualEfficiency: 115,
      avgGroupEfficiency: 114,
      outputAchievement: 80
    },
    {
      name: 'Ashokraj K',
      individualEfficiency: 112,
      avgGroupEfficiency: 113,
      outputAchievement: 90
    },
    {
      name: 'Satheesan B',
      individualEfficiency: 115,
      avgGroupEfficiency: 112,
      outputAchievement: 70
    },
    {
      name: 'Arif Kumar',
      individualEfficiency: 115,
      avgGroupEfficiency: 114,
      outputAchievement: 90
    },
    {
      name: 'Thyagarajan S',
      individualEfficiency: 112,
      avgGroupEfficiency: 115,
      outputAchievement: 68
    }
  ];

  return (
    <div className="flex flex-col p-2 sm:p-4 md:p-6 lg:p-8 h-full">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 w-full">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6">
          Employee Efficiency Overview
        </h1>
        <div className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 10,
                left: 10,
                bottom: 50
              }}
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
      </div>
    </div>
  );
};

export default EmployeeEfficiency;
