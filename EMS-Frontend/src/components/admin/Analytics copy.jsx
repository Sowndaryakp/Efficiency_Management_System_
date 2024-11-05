import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Button } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics = () => {
    const [data, setData] = useState([]);

    // Simulate fetching data
    useEffect(() => {
        // Sample data
        const fetchData = () => {
            const sampleData = [
              { name: 'Basavaraj Kumar', totalHours: 34, efficiency: 113 },
              { name: 'Channakesappa D.V', totalHours: 20, efficiency: 128 },
              { name: 'Giri', totalHours: 56, efficiency: 103 },
              { name: 'Digamber', totalHours: 32, efficiency: 228 },
              { name: 'Shivanand', totalHours: 38, efficiency: 108 },
              { name: 'Rangaswamy', totalHours: 24, efficiency: 143 },
              { name: 'Rajappa', totalHours: 65, efficiency: 188 },
              { name: 'mithun', totalHours: 42, efficiency: 173 },
              { name: 'N V Reddy', totalHours: 78, efficiency: 208 },
              { name: 'Gokul', totalHours: 72, efficiency: 138 },
            ];
            setData(sampleData);
        };

        fetchData();
    }, []);

    const columns = [
        {
            title: 'Employee Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Total Hours',
            dataIndex: 'totalHours',
            key: 'totalHours',
        },
        {
            title: 'Efficiency',
            dataIndex: 'efficiency',
            key: 'efficiency',
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Card title="Employee Efficiency Overview">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="efficiency" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Card title="Employee Summary">
                        {/* Wrap the table in a div for horizontal scrolling */}
                        <div style={{ overflowX: 'auto' }}>
                            <Table columns={columns} dataSource={data} pagination={false} />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Analytics;
