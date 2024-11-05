// src/components/admin/EfficiencyComputation.jsx
import React, { useState } from 'react';
import { Table, Button, Space, Card, Row, Col, Form, Input, Modal, Upload, DatePicker } from 'antd';
import { PlusOutlined, ExportOutlined, InboxOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const EfficiencyComputation = () => {
  const [form] = Form.useForm();
  const [computations, setComputations] = useState([
    {
      date: '01-07-2024',
      ecCode: '983',
      name: 'Ganesh Naik',
      activityCode: '102',
      workOrder: '31311552166',
      june: '',
      july: '1',
      machineType: 'Fluting - 1000mm - Full',
      activityDescription: '250 No of flutes',
      qty: '1',
      actualHrs: '4.50',
      c1: 'C',
      rejectionHrs: '3.37',
      standardHrs: '3.37',
      activityEff: '75%',
      shift: '2.75',
      workingHrs: '227',
      compOffHrs: '0',
      costCentre: '0.00',
      plannedEffPH: '',
      unproductiveHours: '0.00',
      duplicationCheck: 'Duplicate',
      cAndI: '3.4',
      pinnedDates: '',
    },
    {
      date: '01-07-2024',
      ecCode: '983',
      name: 'Ganesh Naik',
      activityCode: '102',
      workOrder: '31311552166',
      june: '',
      july: '1',
      machineType: 'Fluting - 1000mm - Full',
      activityDescription: '250 No of flutes',
      qty: '1',
      actualHrs: '4.50',
      c1: 'C',
      rejectionHrs: '3.37',
      standardHrs: '3.37',
      activityEff: '75%',
      shift: '2.75',
      workingHrs: '227',
      compOffHrs: '0',
      costCentre: '0.00',
      plannedEffPH: '',
      unproductiveHours: '0.00',
      duplicationCheck: 'Duplicate',
      cAndI: '3.4',
      pinnedDates: '',
    },

    // Add more initial data if needed
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({}); // State for filter values

  const showModal = (card) => {
    setEditingCard(card);
    form.setFieldsValue(card);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingCard) {
        // Update existing card
        setComputations(prev => prev.map(card => (card.ecCode === editingCard.ecCode ? { ...card, ...values } : card)));
      } else {
        // Create new card
        const newCard = { ...values };
        setComputations(prev => [...prev, newCard]);
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleDelete = (ecCode) => {
    setComputations(prev => prev.filter(card => card.ecCode !== ecCode));
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(computations);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Efficiency Computation');
    XLSX.writeFile(wb, 'EfficiencyComputation.xlsx');
  };

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
      setComputations(prev => [...prev, ...jsonData]); // Append new data to existing computations
    };
    reader.readAsArrayBuffer(file);
    return false; // Prevent default upload behavior
  };

  const filteredData = computations.filter(calc => {
    return Object.keys(filters).every(key => {
      return !filters[key] || calc[key].toString().toLowerCase().includes(filters[key].toLowerCase());
    });
  });


  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 100,
      align: 'center',
      filters: [...new Set(computations.map(item => ({ text: item.date, value: item.date })))],
      onFilter: (value, record) => record.date === value,
    },
    {
      title: 'EC Code',
      dataIndex: 'ecCode',
      key: 'ecCode',
      width: 100,
      align: 'center',
      filters: [...new Set(computations.map(item => ({ text: item.ecCode, value: item.ecCode })))],
      onFilter: (value, record) => record.ecCode === value,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      align: 'center',
      filters: [...new Set(computations.map(item => ({ text: item.name, value: item.name })))],
      onFilter: (value, record) => record.name === value,
    },
    {
      title: 'Activity Code',
      dataIndex: 'activityCode',
      key: 'activityCode',
      width: 100,
      align: 'center',
      filters: [...new Set(computations.map(item => ({ text: item.activityCode, value: item.activityCode })))],
      onFilter: (value, record) => record.activityCode === value,
    },
    {
      title: 'Work Order No.',
      dataIndex: 'workOrder',
      key: 'workOrder',
      width: 150,
      align: 'center',
      filters: [...new Set(computations.map(item => ({ text: item.workOrder, value: item.workOrder })))],
      onFilter: (value, record) => record.workOrder === value,
    },
    {
      title: 'June',
      dataIndex: 'june',
      key: 'june',
      width: 100,
      align: 'center',
    },
    {
      title: 'July',
      dataIndex: 'july',
      key: 'july',
      width: 100,
      align: 'center',
    },
    {
      title: 'Machine Type',
      dataIndex: 'machineType',
      key: 'machineType',
      width: 200,
      align: 'center',
    },
    {
      title: 'Activity Description',
      dataIndex: 'activityDescription',
      key: 'activityDescription',
      width: 200,
      align: 'center',
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
      width: 100,
      align: 'center',
    },
    {
      title: 'Actual Hrs',
      dataIndex: 'actualHrs',
      key: 'actualHrs',
      width: 100,
      align: 'center',
    },
    {
      title: 'C/I',
      dataIndex: 'c1',
      key: 'c1',
      width: 100,
      align: 'center',
    },
    {
      title: 'Rejection Hrs',
      dataIndex: 'rejectionHrs',
      key: 'rejectionHrs',
      width: 100,
      align: 'center',
    },
    {
      title: 'Standard Hrs',
      dataIndex: 'standardHrs',
      key: 'standardHrs',
      width: 100,
      align: 'center',
    },
    {
      title: 'Activity Eff',
      dataIndex: 'activityEff',
      key: 'activityEff',
      width: 100,
      align: 'center',
    },
    {
      title: 'Shift',
      dataIndex: 'shift',
      key: 'shift',
      width: 100,
      align: 'center',
    },
    {
      title: 'Working Hrs',
      dataIndex: 'workingHrs',
      key: 'workingHrs',
      width: 100,
      align: 'center',
    },
    {
      title: 'Comp Off Hrs',
      dataIndex: 'compOffHrs',
      key: 'compOffHrs',
      width: 100,
      align: 'center',
    },
    {
      title: 'Cost Centre',
      dataIndex: 'costCentre',
      key: 'costCentre',
      width: 100,
      align: 'center',
    },
    {
      title: 'Planned Hrs (PH)',
      dataIndex: 'plannedEffPH',
      key: 'plannedEffPH',
      width: 100,
      align: 'center',
    },
    {
      title: 'Unproductive Hours',
      dataIndex: 'unproductiveHours',
      key: 'unproductiveHours',
      width: 100,
      align: 'center',
    },
    {
      title: 'Duplication Check',
      dataIndex: 'duplicationCheck',
      key: 'duplicationCheck',
      width: 150,
      align: 'center',
    },
    {
      title: 'C & I',
      dataIndex: 'cAndI',
      key: 'cAndI',
      width: 100,
      align: 'center',
    },
    {
      title: 'Pinned Dates',
      dataIndex: 'pinnedDates',
      key: 'pinnedDates',
      width: 100,
      align: 'center',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button className='text-white bg-persian-green-600' onClick={() => showModal(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.ecCode)} danger>Delete</Button>
        </Space>
      ),
      align: 'center',
      width: 150,
    },
  ];

  return (
    <div className="p-2">
      <h1 className="text-2xl font-semibold items-center text-center mb-2">Efficiency Computation</h1>
        <Card>
          <Row gutter={[16, 16]}>
          <Col span={24} xs={24} sm={24} md={12} lg={8}>
            <Space 
              direction="horizontal" 
              style={{ width: '100%', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }} // Adjusted gap
            >
              <Button className='text-white bg-persian-green-600' icon={<PlusOutlined />} onClick={() => showModal(null)} style={{ width: '100%' }}>
                Add
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
                dataSource={filteredData}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: filteredData.length, 
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
                rowKey="ecCode" // Use EC Code as the unique key
                scroll={{ x: 'max-content' }} // Enable horizontal scrolling
              />
            </Col>
          </Row>
        </Card>

        <Modal title={editingCard ? "Edit Entry" : "Add Entry"} visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)} width="80%" centered>
          <Form style={{ width: '100%' }} form={form} layout="horizontal">
               {/* First Row */}
            <Row gutter={16}>
            <Col span={5}>
              <Form.Item name="date" label="Date" rules={[{ required: true }]}>
              <DatePicker format="DD-MM-YYYY" style={{ width: '100%' }} />
              </Form.Item>
              </Col>
            <Col span={5}>
              <Form.Item name="ecCode" label="EC Code" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              </Col>
            <Col span={5}>
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="activityCode" label="Activity Code" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="workOrder" label="Work Order No." rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            </Row>
            
            <Row gutter={16}>
            <Col span={5}>
              <Form.Item name="june" label="June">
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="july" label="July">
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="machineType" label="Machine Type" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="activityDescription" label="Activity Description" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="qty" label="Qty" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            </Row>
            <Row gutter={16}>
            <Col span={5}>
              <Form.Item name="actualHrs" label="Actual Hrs" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="c1" label="C/I" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="rejectionHrs" label="Rejection Hrs" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="standardHrs" label="Standard Hrs" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="activityEff" label="Activity Eff" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            </Row>

            <Row gutter={16}>
            <Col span={5}>
              <Form.Item name="shift" label="Shift" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="workingHrs" label="Working Hrs" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="compOffHrs" label="Comp Off Hrs" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="costCentre" label="Cost Centre" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="plannedEffPH" label="Planned Hrs (PH)">
                <Input />
              </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
            <Col span={5}>
              <Form.Item name="unproductiveHours" label="Unproductive Hours">
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="duplicationCheck" label="Duplication Check" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="cAndI" label="C & I" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="pinnedDates" label="Pinned Dates">
                <Input />
              </Form.Item>
            </Col>
            </Row>
          </Form>
        </Modal>
      </div>
  );
};

export default EfficiencyComputation;