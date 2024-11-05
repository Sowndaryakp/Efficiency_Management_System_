// src/components/admin/ActivityCodeSheet.jsx
import React, { useState } from 'react';
import { Table, Button, Space, Card, Row, Col, Form, Input, Modal, Upload } from 'antd';
import { PlusOutlined, ExportOutlined, InboxOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const ViewAllActivityCodes = () => {
  const [form] = Form.useForm();
  const [activityCodes, setActivityCodes] = useState([
    { activityCode: 90000, machineType: 'MTRA Aspiration Box', workCenter: 215000, description: 'Aspiration Box complete', finalHrsWLF: 0.54 },
    { activityCode: 115000, machineType: 'AITA', workCenter: 215000, description: 'BED PLATE FOR 60 PITCH', finalHrsWLF: 0.26 },
    { activityCode: 115001, machineType: 'AITA', workCenter: 215000, description: 'AITA Border cutting', finalHrsWLF: 0.48 },
    { activityCode: 1000, machineType: 'BSPB top white II', workCenter: 215000, description: '2 MM CRCA', finalHrsWLF: 0.48 },
    { activityCode: 1001, machineType: 'BSPB top white II', workCenter: 215000, description: '1.5 MM CRCA', finalHrsWLF: 0.16 },
    { activityCode: 1004, machineType: 'BSPB top white II', workCenter: 215000, description: '3 MM CRCA', finalHrsWLF: 0.07 },
    { activityCode: 1006, machineType: 'BSPB top white II', workCenter: 215000, description: '2MM SS', finalHrsWLF: 0.1 },
    { activityCode: 1007, machineType: 'BSPB top white II', workCenter: 215000, description: 'Sieves', finalHrsWLF: 0 },
    { activityCode: 95821, machineType: 'AIHI', workCenter: 215000, description: 'Dia 2 mm sieve', finalHrsWLF: 3.63 },
    { activityCode: 95822, machineType: 'AIHI', workCenter: 215000, description: '1.5*25 slot sieve', finalHrsWLF: 0.57 },
    { activityCode: 95823, machineType: 'AIHI', workCenter: 215000, description: 'Dia 2.25 mm sieve', finalHrsWLF: 0.28 },
    { activityCode: 40005, machineType: 'DRGA 1E', workCenter: 215000, description: '2.5 mm sheet', finalHrsWLF: 0.28 },
    { activityCode: 42000, machineType: 'DRGA 3D', workCenter: 215000, description: '1.5 mm sheet', finalHrsWLF: 0.53 },
    { activityCode: 45000, machineType: 'DRGA 3E', workCenter: 215000, description: '2.5 mm sheet', finalHrsWLF: 0.53 },
    { activityCode: 70000, machineType: 'DRSD II', workCenter: 215000, description: 'Mesh', finalHrsWLF: 0.3 },
    { activityCode: 'DRSD-215-001', machineType: 'DRSD III', workCenter: 215000, description: 'Punching mesh', finalHrsWLF: 0.4 },
    { activityCode: 77000, machineType: 'MGXD 110', workCenter: 215000, description: 'Punching', finalHrsWLF: 0.4 },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCode, setEditingCode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [pageSize, setPageSize] = useState(10); // Track the number of items per page

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current); // Update current page on change
    setPageSize(pagination.pageSize); // Update page size on change
  };

  const showModal = (code) => {
    setEditingCode(code);
    form.setFieldsValue(code);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingCode) {
        // Update existing activity code
        setActivityCodes(prev => prev.map(code => (code.activityCode === editingCode.activityCode ? { ...code, ...values } : code)));
      } else {
        // Create new activity code
        const newCode = { ...values }; // Use manual EC No
        setActivityCodes(prev => [...prev, newCode]);
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleDelete = (activityCode) => {
    setActivityCodes(prev => prev.filter(code => code.activityCode !== activityCode));
  };

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setActivityCodes(prev => [...prev, ...jsonData]); // Append new data to existing activity codes
    };
    reader.readAsArrayBuffer(file);
    return false; // Prevent default upload behavior
  };

  const columns = [
    {
      title: 'Activity Code',
      dataIndex: 'activityCode',
      key: 'activityCode',
      width: 150,
      align: 'center',
      filters: activityCodes.map(code => ({ text: code.activityCode.toString(), value: code.activityCode })),
      onFilter: (value, record) => record.activityCode.toString() === value.toString(),
    },
    {
      title: 'Machine Type',
      dataIndex: 'machineType',
      key: 'machineType',
      width: 150,
      align: 'center',
      filters: [...new Set(activityCodes.map(code => ({ text: code.machineType, value: code.machineType })))],
      onFilter: (value, record) => record.machineType === value,
    },
    {
      title: 'Work Center',
      dataIndex: 'workCenter',
      key: 'workCenter',
      width: 150,
      align: 'center',
      filters: [...new Set(activityCodes.map(code => ({ text: code.workCenter.toString(), value: code.workCenter })))],
      onFilter: (value, record) => record.workCenter.toString() === value.toString(),
    },
    {
      title: 'Activity Description',
      dataIndex: 'description',
      key: 'description',
      width: 150,
      align: 'center',
      filters: [...new Set(activityCodes.map(code => ({ text: code.description, value: code.description })))],
      onFilter: (value, record) => record.description.includes(value),
    },
    {
      title: 'Final Hrs WLF',
      dataIndex: 'finalHrsWLF',
      key: 'finalHrsWLF',
      width: 150,
      align: 'center',
      filters: [...new Set(activityCodes.map(code => ({ text: code.finalHrsWLF.toString(), value: code.finalHrsWLF })))],
      onFilter: (value, record) => record.finalHrsWLF.toString() === value.toString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button className='text-white bg-persian-green-600' onClick={() => showModal(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.activityCode)} danger>Delete</Button>
        </Space>
      ),
      align: 'center',
    },
  ];

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(activityCodes);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Activity Code Management');
    XLSX.writeFile(wb, 'ActivityCodeManagement.xlsx');
  };

  return (
    <div className="p-2">
      <h1 className="text-2xl font-semibold items-center text-center mb-2">Activity Code Management</h1>
        <Card>
          <Row gutter={[16, 16]}>
          <Col span={24} xs={24} sm={24} md={12} lg={8}>
            <Space 
              direction="horizontal" 
              style={{ width: '100%', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }} // Adjusted gap
            >
              <Button className='text-white bg-persian-green-600' icon={<PlusOutlined />} onClick={() => showModal(null)} style={{ width: '100%' }}>
                Add Activity Code
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
                dataSource={activityCodes}
                scroll={{ x: 'max-content' }}
                pagination={{ 
                  current: currentPage, 
                  pageSize: pageSize,
                  total: activityCodes.length,
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
                rowKey="activityCode"
                onChange={handleTableChange}
              />
            </Col>
          </Row>
        </Card>

        <Modal title={editingCode ? "Edit Activity Code" : "Add Activity Code"} visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)}>
          <Form form={form} layout="vertical">
            <Form.Item name="activityCode" label="Activity Code" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="machineType" label="Machine Type" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="workCenter" label="Work Center" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Activity Description" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="finalHrsWLF" label="Final Hrs WLF" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
  );
};

export default ViewAllActivityCodes;