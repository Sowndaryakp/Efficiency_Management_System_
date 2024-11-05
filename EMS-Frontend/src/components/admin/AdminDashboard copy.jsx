// src/components/admin/AdminDashboard.jsx
import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  // Sample data for overview metrics
  const overviewData = {
    avgEfficiency: 117.8,
    totalEmployees: 141,
    unproductiveHours: 105.9
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

  // Colors for light theme
  const LIGHT_COLORS = ['#557ca2', '#426287', '#37506d', '#30455c'];
  // Colors for dark theme
  const DARK_COLORS = ['#f5f7fa', '#eaeef4', '#d0dbe7', '#a6bcd3'];

  // Choose theme based on a condition (e.g., a state or prop)
  const isDarkTheme = false; // Change this to true for dark theme

  const COLORS = isDarkTheme ? DARK_COLORS : LIGHT_COLORS;

  return (
    <div className={`flex flex-col p-6 gap-6 ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen`}>
      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`bg-white rounded-lg shadow-sm p-6 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col">
            <span className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>Avg Efficiency</span>
            <div className="flex items-center">
              <span className="text-2xl font-bold">{overviewData.avgEfficiency}%</span>
              <svg className="w-4 h-4 text-green-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
          </div>
        </div>

        <div className={`bg-white rounded-lg shadow-sm p-6 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col">
            <span className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>Total Employees</span>
            <span className="text-2xl font-bold">{overviewData.totalEmployees}</span>
          </div>
        </div>

        <div className={`bg-white rounded-lg shadow-sm p-6 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col">
            <span className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>Unproductive Hours</span>
            <span className="text-2xl font-bold">{overviewData.unproductiveHours}</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Detailed Reports */}
        <div className={`bg-white rounded-lg shadow-sm p-6 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-semibold ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>Detailed Reports</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">Filter</button>
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">Export</button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <Line type="monotone" dataKey="Completed" stroke={COLORS[0]} strokeWidth={2} />
                <Line type="monotone" dataKey="Ongoing" stroke={COLORS[1]} strokeWidth={2} />
                <Line type="monotone" dataKey="NotStarted" stroke={COLORS[2]} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Distribution */}
        <div className={`bg-white rounded-lg shadow-sm p-6 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-semibold ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>Department Distribution</h3>
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
        <div className={`bg-white rounded-lg shadow-sm p-6 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-semibold ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>Efficiency Distribution</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">15 days</button>
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">30 days</button>
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">Export</button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <Bar dataKey="last15" fill={COLORS[0]} />
                <Bar dataKey="last30" fill={COLORS[1]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Employee Efficiency Metrics */}
        <div className={`bg-white rounded-lg shadow-sm p-6 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-semibold ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>Employee Efficiency Metrics</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">15 days</button>
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">30 days</button>
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">Export</button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <Line type="monotone" dataKey="Completed" stroke={COLORS[0]} strokeWidth={2} />
                <Line type="monotone" dataKey="Ongoing" stroke={COLORS[1]} strokeWidth={2} />
                <Line type="monotone" dataKey="NotStarted" stroke={COLORS[2]} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;