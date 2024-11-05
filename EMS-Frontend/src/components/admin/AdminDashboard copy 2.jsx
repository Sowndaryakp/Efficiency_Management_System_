import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  // Sample data for overview metrics
  const overviewData = {
    avgEfficiency: 117.8,
    totalEmployees: 149,
    unproductiveHours: 50.9,
    productiveHours: 105.9
  };

  // Sample data for line chart
  const lineChartData = [
    { month: 'Mon', Completed: 30, Ongoing: 20, NotStarted: 15 },
    { month: 'Tue', Completed: 25, Ongoing: 35, NotStarted: 20 },
    { month: 'Wed', Completed: 40, Ongoing: 25, NotStarted: 10 },
    { month: 'Thu', Completed: 35, Ongoing: 30, NotStarted: 25 },
    { month: 'Fri', Completed: 20, Ongoing: 15, NotStarted: 30 },
    { month: 'Sat', Completed: 30, Ongoing: 10, NotStarted: 20 }
  ];

  // Sample data for department distribution
  const pieChartData = [
    { name: 'Dept A', value: 35 },
    { name: 'Dept B', value: 25 },
    { name: 'Dept C', value: 20 },
    { name: 'Dept D', value: 20 }
  ];

  // Sample data for efficiency distribution
  const barChartData = [
    { name: 'Group 1', last15: 20, last30: 45 },
    { name: 'Group 2', last15: 18, last30: 25 },
    { name: 'Group 3', last15: 35, last30: 20 },
    { name: 'Group 4', last15: 40, last30: 35 },
    { name: 'Group 5', last15: 25, last30: 28 }
  ];

  // Colors for charts
  const COLORS = ['#3B82F6', '#34D399', '#F59E0B', '#EF4444'];

  return (
    <div className="flex flex-col p-6 gap-6 bg-gray-50 min-h-screen">
      {/* Overview Section */}
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

      
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Detailed Reports */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Detailed Reports</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">Filter</button>
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">Export</button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <Line type="monotone" dataKey="Completed" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="Ongoing" stroke="#F59E0B" strokeWidth={2} />
                <Line type="monotone" dataKey="NotStarted" stroke="#34D399" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Department Distribution</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">Filter</button>
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">Export</button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Efficiency Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Efficiency Distribution</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">15 days</button>
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">30 days</button>
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">Export</button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <Bar dataKey="last15" fill="#3B82F6" />
                <Bar dataKey="last30" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Employee Efficiency Metrics */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Employee Efficiency Metrics</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">15 days</button>
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">30 days</button>
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">Export</button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <Line type="monotone" dataKey="Completed" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="Ongoing" stroke="#F59E0B" strokeWidth={2} />
                <Line type="monotone" dataKey="NotStarted" stroke="#34D399" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;