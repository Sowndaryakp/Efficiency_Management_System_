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

const AdminDashboard = () => {
  // Sample data for overview metrics
  const overviewData = {
    avgEfficiency: 117.8,
    totalEmployees: 149,
    unproductiveHours: 50.9,
    productiveHours: 105.9,
  };

  return (
    <div className="flex flex-col p-6 gap-6 bg-gray-50 min-h-screen">
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-100 rounded-lg shadow-lg p-6 flex flex-col items-center"> {/* Centered content */}
          <div className="flex flex-col items-center"> {/* Centered content */}
            <span className="text-2xl font-bold">Average Task Completion</span>
            <div className="flex items-center">
              <span className="text-3xl font-bold text-blue-600">{overviewData.avgEfficiency}%</span>
              <svg className="w-5 h-5 text-blue-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> {/* Icon for Average Task Completion */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-green-100 rounded-lg shadow-lg p-6 flex flex-col items-center"> {/* Centered content */}
          <div className="flex flex-col items-center"> {/* Centered content */}
            <span className="text-2xl font-bold">Total Employees</span>
            <div className="flex items-center">
            <span className="text-3xl font-bold text-green-600">{overviewData.totalEmployees}</span>
            <svg className="w-5 h-5 text-green-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> {/* Icon for Total Employees */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12v4m0 0h-8m8 0h-8m8-4h-8m8 0h-8m8 0h-8" />
            </svg>
            </div>
          </div>
        </div>

        <div className="bg-red-100 rounded-lg shadow-lg p-6 flex flex-col items-center"> {/* Centered content */}
          <div className="flex flex-col items-center"> {/* Centered content */}
            <span className="text-2xl font-bold">Total Downtime</span>
            <div className="flex items-center">
            <span className="text-3xl font-bold text-red-600">{overviewData.unproductiveHours}</span>
            <svg className="w-5 h-5 text-red-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> {/* Icon for Total Downtime */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 0v4m0-4h4m-4 0H8" />
            </svg>
            </div>
          </div>
        </div>

        <div className="bg-yellow-100 rounded-lg shadow-lg p-6 flex flex-col items-center"> {/* Centered content */}
          <div className="flex flex-col items-center"> {/* Centered content */}
            <span className="text-2xl font-bold">Total Productive Hours</span>
            <div className="flex items-center">
            <span className="text-3xl font-bold text-yellow-600">{overviewData.productiveHours}</span>
            <svg className="w-5 h-5 text-yellow-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> {/* Icon for Total Productive Hours */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0 0h8m-8 0H4" />
            </svg>
            </div>
          </div>
        </div>
      </div>



      <div className="flex flex-row gap-4">
      <ApprovalStatusPieChart />
      <JobCardCompletionStatusChart />
      <EfficienyAllVarietyCharts />
    </div>

    <div className="flex flex-row gap-4">
    {/* <ApprovalStatusPieChart />
      <TopEmployeeEfficiencyChart /> */}
      {/* <TopEmployeeIncentiveChart /> */}
    </div>
    
    {/* <div className='flex flex-row gap-4'>
      <MonthlyIndividualIncentiveChart />
      <MonthlyGroupIncentiveChart />
    </div>

    <div className='flex flex-row gap-4'>
      <OutputBasedIncentiveChart />
    
    </div> */}
 

    </div>
  );
};

export default AdminDashboard;
