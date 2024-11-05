import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import ApprovalStatusPieChart from './charts/DuplicateApprovalStatusPieChart';
import TopEmployeeEfficiencyChart from './charts/TopEmployeeEfficiencyChart';
import MonthlyIndividualIncentiveChart from './charts/MonthlyIndividualIncentiveChart';
import MonthlyGroupIncentiveChart from './charts/MonthlyGroupIncentiveChart';
import OutputBasedIncentiveChart from './charts/OutputBasedIncentiveChart';
import JobCardCompletionStatusChart from './charts/JobCardCompletionStatusChart';
import TopEmployeeIncentiveChart from './charts/TopEmployeeIncentiveChart';
import EfficienyAllVarietyCharts from './charts/EfficienyAllVarietyCharts';

const Analytics = () => {
  // Sample data for overview metrics
  const overviewData = {
    avgEfficiency: 117.8,
    totalEmployees: 149,
    unproductiveHours: 50.9,
    productiveHours: 105.9,
  };

  return (
    <div className="flex flex-col p-6 gap-6 bg-gray-50 min-h-screen">

    <div className="flex flex-row gap-4">
      <TopEmployeeEfficiencyChart />
      {/* <TopEmployeeIncentiveChart /> */}
    </div>
    
    <div className='flex flex-row gap-4'>
      <MonthlyIndividualIncentiveChart />
      <MonthlyGroupIncentiveChart />
    </div>

    <div className='flex flex-row gap-4'>
      <OutputBasedIncentiveChart />
    
    </div>
 

    </div>
  );
};

export default Analytics;
