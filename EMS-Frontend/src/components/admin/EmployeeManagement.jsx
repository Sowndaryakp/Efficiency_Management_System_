// src/components/admin/EmployeeManagement.jsx
import React, { useState } from 'react';
import { Table, Button, Space, Card, Row, Col, Form, Input, Modal, Upload, Select } from 'antd';
import { PlusOutlined, ExportOutlined, InboxOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const EmployeeManagement = () => {
  const [form] = Form.useForm();
  const [jobCards, setJobCards] = useState([
    {
      ecNo: 1263,
      costCentre: 236,
      category: 'Prod Asst/Trainee',
      name: 'Digamber',
      dept: 'MC',
      phoneNumber: '5767658568',
      empType: 'Fulltime', // Added Emp Type
    },
    {
      ecNo: 1817,
      costCentre: 236,
      category: 'Prod Asst/Trainee',
      name: 'Shivannad',
      dept: 'MC',
      phoneNumber: '8890980878',
      empType: 'Contract', // Added Emp Type
    },
    {
      ecNo: 937,
      costCentre: 245,
      category: 'Prod Asst/Trainee',
      name: 'Basavaraj',
      dept: 'Paint',
      phoneNumber: '7899798890',
      empType: 'Fulltime', // Added Emp Type
    },
    {
      ecNo: 697,
      costCentre: 245,
      category: 'Prod Asst/Trainee',
      name: 'Giri',
      dept: 'Paint',
      phoneNumber: '7890998000',
      empType: 'Contract', // Added Emp Type
    },
    {
      ecNo: 680,
      costCentre: 250,
      category: 'Prod Asst/Trainee',
      name: 'Channabasappa',
      dept: 'Paint',
      phoneNumber: '7978670000',
      empType: 'Fulltime', // Added Emp Type
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  
  const showModal = (card) => {
    setEditingCard(card);
    form.setFieldsValue(card);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingCard) {
        // Update existing card
        setJobCards(prev => prev.map(card => (card.ecNo === editingCard.ecNo ? { ...card, ...values } : card)));
      } else {
        // Create new card
        const newCard = { ...values }; // Use manual EC No
        setJobCards(prev => [...prev, newCard]);
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleDelete = (ecNo) => {
    setJobCards(prev => prev.filter(card => card.ecNo !== ecNo));
  };

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
      setJobCards(prev => [...prev, ...jsonData]); // Append new data to existing job cards
    };
    reader.readAsArrayBuffer(file);
    return false; // Prevent default upload behavior
  };

  const columns = [
    {
      title: 'EC No',
      dataIndex: 'ecNo',
      key: 'ecNo',
      width: 150,
      align: 'center', // Center align
    },
    {
      title: 'Cost Centre',
      dataIndex: 'costCentre',
      key: 'costCentre',
      width: 150,
      align: 'center', // Center align
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 150,
      align: 'center', // Center align
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      align: 'center', // Center align
    },
    {
      title: 'Dept',
      dataIndex: 'dept',
      key: 'dept',
      width: 150,
      align: 'center', // Center align
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 150,
      align: 'center', // Center align
    },
    {
      title: 'Emp Type', // New Column
      dataIndex: 'empType',
      key: 'empType',
      width: 150,
      align: 'center', // Center align
      filters: [
        { text: 'Fulltime', value: 'Fulltime' },
        { text: 'Contract', value: 'Contract' },
      ],
      onFilter: (value, record) => record.empType === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button className='text-white bg-persian-green-600' onClick={() => showModal(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.ecNo)} danger>Delete</Button>
        </Space>
      ),
      align: 'center', // Center align
    },
  ];

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(jobCards);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Employee Management');
    XLSX.writeFile(wb, 'EmployeeManagement.xlsx');
  };

  return (
    <div className="p-2">
      <h1 className="text-2xl font-semibold items-center text-center mb-2">Employee Management</h1>
      <Card>
        <Row gutter={[16, 16]}>
          <Col span={24} xs={24} sm={24} md={12} lg={8}>
            <Space
              direction="horizontal"
              style={{ width: '100%', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }} // Adjusted gap
            >
              <Button className='text-white bg-persian-green-600' icon={<PlusOutlined />} onClick={() => showModal(null)} style={{ width: '100%' }}>
                Add Employee
              </Button>
              <Button className='text-white bg-persian-green-600' icon={<ExportOutlined />} onClick={exportToExcel} style={{ width: '100%' }}>
                Export to Excel
              </Button>
              <Upload
                accept=".xlsx, .xls"
                showUploadList={false}
                beforeUpload={handleUpload}
                style={{ width: '100%' }}
              >
                <Button icon={<InboxOutlined />} style={{ width: '100%' }}>Upload Excel</Button>
              </Upload>
            </Space>
          </Col>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={jobCards}
              scroll={{ x: 'max-content' }}
              bordered
              rowKey="ecNo"
            />
          </Col>
        </Row>
      </Card>
      <Modal title="Employee Management" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={handleOk}>
        <Form form={form} layout="vertical">
          <Form.Item label="EC No" name="ecNo">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Cost Centre" name="costCentre">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Input />
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Dept" name="dept">
            <Input />
          </Form.Item>
          <Form.Item label="Phone Number" name="phoneNumber">
            <Input />
          </Form.Item>
          <Form.Item label="Emp Type" name="empType">
            <Select placeholder="Select Employee Type">
              <Select.Option value="Fulltime">Fulltime</Select.Option>
              <Select.Option value="Contract">Contract</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeeManagement;
