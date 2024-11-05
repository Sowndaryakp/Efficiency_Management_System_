import React from 'react';
import { Card, Row, Col } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const Reports = () => {
  // Sample data for charts
  const efficiencyData = [
    { name: 'Stormwind Kannan', efficiency: 108 },
    { name: 'Madhusudhanan', efficiency: 105 },
    { name: 'Girish G', efficiency: 107 },
    { name: 'Sathishkumar KU', efficiency: 125 },
    { name: 'Shashidhar DV', efficiency: 118 },
  ];

  const jobCardData = [
    { name: 'Jan', completed: 30, pending: 10 },
    { name: 'Feb', completed: 40, pending: 20 },
    { name: 'Mar', completed: 50, pending: 15 },
  ];

  const incentiveData = [
    { name: 'Basavaraj Kumar', efficiency: 113 },
    { name: 'Channakesappa D.V', efficiency: 128 },
    { name: 'Giri', efficiency: 103 },
    { name: 'Digamber', efficiency: 228 },
    { name: 'Shivanand', efficiency: 108 },
    { name: 'Rangaswamy', efficiency: 143 },
    { name: 'Rajappa', efficiency: 188 },
    { name: 'mithun', efficiency: 173 },
    { name: 'N V Reddy', efficiency: 208 },
    { name: 'Gokul', efficiency: 138 },
  ];

  return (
    <div className="p-2">
      <h1 className="text-2xl font-semibold items-center text-center mb-2">Reports Overview</h1>

        <Card style={{ width: '100%' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <h1 className="text-2xl font-semibold items-center text-center mb-4">Employee Efficiency</h1>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={efficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="efficiency" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <h1 className="text-2xl font-semibold items-center text-center mb-4">Job Card Completion</h1>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={jobCardData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="completed" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="pending" stroke="#ff7300" />
                </LineChart>
              </ResponsiveContainer>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24}>
              <h1 className="text-2xl font-semibold items-center text-center mb-4">Incentive Efficiency</h1>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={incentiveData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="efficiency" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </Col>
          </Row>
        </Card>

    </div>
  );
};

export default Reports;
