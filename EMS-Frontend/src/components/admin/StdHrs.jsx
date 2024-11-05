import React, { useState } from 'react';
import { Table, Button, Space, Card, Row, Col, Form, Input, Modal, Upload } from 'antd';
import { PlusOutlined, ExportOutlined, InboxOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const StdHrs = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([
    {
      key: '1',
      activityCode: 'DIPRO-220-025',
      machineType: 'DIPRO With Mixing tube',
      workCenter: '220000',
      activityDescription: 'Can box456 inch(Tse)',
      finalHrsVLE: '8.00',
    },
    {
      key: '2',
      activityCode: 'DIPRO-220-026',
      machineType: 'DIPRO Standard',
      workCenter: '220001',
      activityDescription: 'Can box457 inch(Tse)',
      finalHrsVLE: '6.50',
    },
    {
      key: '3',
      activityCode: 'DIPRO-220-027',
      machineType: 'DIPRO Advanced',
      workCenter: '220002',
      activityDescription: 'Can box458 inch(Tse)',
      finalHrsVLE: '7.25',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const showModal = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingRecord) {
        // Update existing record
        setData(prev => prev.map(item => (item.key === editingRecord.key ? { ...item, ...values } : item)));
      } else {
        // Create new record
        const newRecord = { key: Date.now().toString(), ...values }; // Generate a new key
        setData(prev => [...prev, newRecord]);
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleDelete = (key) => {
    setData(prev => prev.filter(item => item.key !== key));
  };

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
      const formattedData = jsonData.map((item, index) => ({ key: (data.length + index + 1).toString(), ...item }));
      setData(prev => [...prev, ...formattedData]); // Append new data to existing records
    };
    reader.readAsArrayBuffer(file);
    return false; // Prevent default upload behavior
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Standard Hours');
    XLSX.writeFile(wb, 'StandardHours.xlsx');
  };

  const columns = [
    {
      title: 'Activity Code',
      dataIndex: 'activityCode',
      key: 'activityCode',
    },
    {
      title: 'Machine Type',
      dataIndex: 'machineType',
      key: 'machineType',
    },
    {
      title: 'Work Centre',
      dataIndex: 'workCenter',
      key: 'workCenter',
    },
    {
      title: 'Activity Description',
      dataIndex: 'activityDescription',
      key: 'activityDescription',
    },
    {
      title: 'Final Hrs VLE',
      dataIndex: 'finalHrsVLE',
      key: 'finalHrsVLE',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => showModal(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.key)} danger>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-2">
      <h1 className="text-2xl font-semibold items-center text-center mb-2">Standard Hours Management</h1>
      <Card>
        <Row gutter={[16, 16]}>
          <Col span={24} xs={24} sm={24} md={12} lg={8}>
            <Space 
              direction="horizontal" 
              style={{ width: '100%', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }} // Adjusted gap
            >
              <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal(null)} style={{ width: '100%' }}>
                Add Job Card
              </Button>
              <Button type="primary" icon={<ExportOutlined />} onClick={exportToExcel} style={{ width: '100%' }}>
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
              dataSource={data}
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: data.length,
                showTotal: (total) => `Total ${total} items`, 
                onChange: (page, size) => {
                  setCurrentPage(page);
                  setPageSize(size);
                },
                showSizeChanger: true,
                pageSizeOptions: ['5', '10', '20'],
              }}
              bordered
              size="small"
              rowKey="key"
              style={{ width: '100%' }} // Ensure table takes full width
              scroll={{ x: 800 }} // Enable horizontal scrolling for the table
            />
          </Col>
        </Row>
      </Card>

      <Modal title={editingRecord ? "Edit Record" : "Add Record"} visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="activityCode" label="Activity Code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="machineType" label="Machine Type" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="workCenter" label="Work Centre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="activityDescription" label="Activity Description" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="finalHrsVLE" label="Final Hrs VLE" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StdHrs;
