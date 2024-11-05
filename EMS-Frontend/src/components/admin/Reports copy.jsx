import React, { useState } from 'react';
import { Download, Filter } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [activeTab, setActiveTab] = useState('overview');

  // Efficiency Trends Data
  const efficiencyData = [
    { month: 'Jan', efficiency: 85, target: 90 },
    { month: 'Feb', efficiency: 88, target: 90 },
    { month: 'Mar', efficiency: 92, target: 90 },
    { month: 'Apr', efficiency: 89, target: 90 },
    { month: 'May', efficiency: 94, target: 90 },
    { month: 'Jun', efficiency: 91, target: 90 },
  ];

  // Department Performance Data
  const departmentData = [
    { department: 'Production', performance: 87, output: 2450 },
    { department: 'Assembly', performance: 92, output: 1980 },
    { department: 'Quality', performance: 85, output: 1560 },
    { department: 'Packaging', performance: 89, output: 2100 },
  ];

  // Resource Utilization Data
  const utilizationData = [
    { name: 'Active', value: 65, color: '#4CAF50' },
    { name: 'Idle', value: 20, color: '#FFC107' },
    { name: 'Maintenance', value: 10, color: '#2196F3' },
    { name: 'Downtime', value: 5, color: '#F44336' },
  ];

  // Recent Activity Data
  const activityData = [
    { timestamp: '2024-03-15 09:30', activity: 'Production Line A Started', status: 'Active' },
    { timestamp: '2024-03-15 10:15', activity: 'Quality Check Completed', status: 'Completed' },
    { timestamp: '2024-03-15 11:00', activity: 'Maintenance Scheduled', status: 'Pending' },
    { timestamp: '2024-03-15 12:30', activity: 'Shift Handover', status: 'Active' },
  ];

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports Dashboard</h1>
        <div className="flex space-x-4">
          <select 
            className="px-4 py-2 border rounded-lg bg-white"
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="flex items-center px-4 py-2 border rounded-lg bg-white hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
          <button className="flex items-center px-4 py-2 bg-persian-green-600 text-white rounded-lg hover:bg-persian-green-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Custom Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-4">
          {['overview', 'efficiency', 'utilization', 'activity'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-persian-green-500 text-persian-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Efficiency Trends Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Efficiency Trends</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={efficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="efficiency" stroke="#8884d8" name="Efficiency" />
                  <Line type="monotone" dataKey="target" stroke="#82ca9d" name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Performance Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Department Performance</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="performance" fill="#8884d8" name="Performance" />
                  <Bar dataKey="output" fill="#82ca9d" name="Output" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Resource Utilization Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Resource Utilization</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={utilizationData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {utilizationData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activityData.map((row, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row.activity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          row.status === 'Active' ? 'bg-green-100 text-green-800' :
                          row.status === 'Completed' ? 'bg-persian-green-100 text-persian-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;