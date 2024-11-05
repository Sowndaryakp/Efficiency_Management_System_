import React, { useState } from 'react';
import { Card, Row, Col, Button, Select, DatePicker } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import moment from 'moment';

const { Option } = Select;

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
  ];

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [dateRange, setDateRange] = useState([moment().startOf('month'), moment().endOf('month')]);

  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
    // Implement filtering logic based on selected department
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
    // Implement filtering logic based on selected date range
  };

  const exportToExcel = () => {
    // Implement export functionality here
  };

  return (
    <div className="p-2">
      <h1 className="text-2xl font-semibold items-center text-center mb-2">Reports Overview</h1>
      <div className="p-6" style={{ display: 'flex', justifyContent: 'center' }}>
        <Card style={{ width: '100%' }}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Button type="primary" onClick={exportToExcel}>
                Export to Excel
              </Button>
            </Col>
            <Col span={12}>
              <Select
                placeholder="Select Department"
                style={{ width: '100%' }}
                onChange={handleDepartmentChange}
              >
                <Option value="HR">HR</Option>
                <Option value="Production">Production</Option>
                <Option value="Sales">Sales</Option>
                {/* Add more departments as needed */}
              </Select>
            </Col>
            <Col span={12}>
              <DatePicker.RangePicker
                value={dateRange}
                onChange={handleDateChange}
                style={{ width: '100%' }}
              />
            </Col>
            <Col span={12}>
              <h2>Employee Efficiency</h2>
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
            <Col span={12}>
              <h2>Job Card Completion</h2>
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
            <Col span={24}>
              <h2>Incentive Efficiency</h2>
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
    </div>
  );
};

export default Reports;