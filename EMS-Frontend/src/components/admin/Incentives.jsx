// src/components/admin/Incentives.jsx
import React, { useState } from 'react';
import { Table, Button, Space, Card, Row, Col, Form, Input, Modal, Upload } from 'antd';
import { PlusOutlined, InboxOutlined, ExportOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const Incentives = () => {
  const [form] = Form.useForm();
  const [calculations, setCalculations] = useState([
    {
      ecCode: '759',
      department: 'VST W',
      costCentre: '220',
      category: 'Union',
      name: 'Basavaraj Kumar',
      totalHours: '204',
      leaveDays: '4',
      compOffHours: '0.0',
      actualHours: '172',
      totalUnproductiveHours: '28.5',
      plannedHours: '143.0',
      stdAllowedSHA: '162.2',
      rejectedHrs: '0.0',
      stdHrsSH: '162.2',
      efficiencyE: '113%',
      efficiencyESH: '17',
      averageEff: '110%',
      outputGrp: '1',
      round: '82',
      missing: '25'
    },
    {
      ecCode: '680',
      department: 'PNT',
      costCentre: '220',
      category: 'Prod Asst',
      name: 'Channakesappa D.V',
      totalHours: '212',
      leaveDays: '2',
      compOffHours: '0.0',
      actualHours: '205',
      totalUnproductiveHours: '3.0',
      plannedHours: '196.8',
      stdAllowedSHA: '232.2',
      rejectedHrs: '0.0',
      stdHrsSH: '232.2',
      efficiencyE: '128%',
      efficiencyESH: '1',
      averageEff: '123%',
      outputGrp: '1',
      round: '81',
      missing: ''
    }
  ]);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [filters, setFilters] = useState({}); // State for filter values

  const showModal = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingRecord) {
        setCalculations(prev => prev.map(calc => (calc.ecCode === editingRecord.ecCode ? { ...calc, ...values } : calc)));
      } else {
        setCalculations(prev => [...prev, values]);
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleDelete = (ecCode) => {
    setCalculations(prev => prev.filter(calc => calc.ecCode !== ecCode));
  };

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
      setCalculations(prev => [...prev, ...jsonData]);
    };
    reader.readAsArrayBuffer(file);
    return false; // Prevent default upload behavior
  };


  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current); // Update current page on change
    setPageSize(pagination.pageSize); // Update page size on change
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(calculations);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Incentives');
    XLSX.writeFile(wb, 'Incentives_Data.xlsx');
  };

  const filteredData = calculations.filter(calc => {
    return Object.keys(filters).every(key => {
      return !filters[key] || calc[key].toString().toLowerCase().includes(filters[key].toLowerCase());
    });
  });

  const columns = [
    { 
        title: 'EC Code', 
        dataIndex: 'ecCode', 
        key: 'ecCode', 
        filters: [...new Set(calculations.map(calc => ({ text: calc.ecCode, value: calc.ecCode })))], 
        onFilter: (value, record) => record.ecCode.includes(value) 
    },
    { 
        title: 'Department', 
        dataIndex: 'department', 
        key: 'department', 
        filters: [...new Set(calculations.map(calc => ({ text: calc.department, value: calc.department })))], 
        onFilter: (value, record) => record.department.includes(value) 
    },
    { 
        title: 'Cost Centre', 
        dataIndex: 'costCentre', 
        key: 'costCentre', 
        filters: [...new Set(calculations.map(calc => ({ text: calc.costCentre, value: calc.costCentre })))], 
        onFilter: (value, record) => record.costCentre.includes(value) 
    },
    { 
        title: 'Category', 
        dataIndex: 'category', 
        key: 'category', 
        filters: [...new Set(calculations.map(calc => ({ text: calc.category, value: calc.category })))], 
        onFilter: (value, record) => record.category.includes(value) 
    },
    { 
        title: 'Name', 
        dataIndex: 'name', 
        key: 'name', 
        filters: [...new Set(calculations.map(calc => ({ text: calc.name, value: calc.name })))], 
        onFilter: (value, record) => record.name.includes(value) 
    },
    { title: 'Total Hours', dataIndex: 'totalHours', key: 'totalHours' },
    { title: 'Leave Days', dataIndex: 'leaveDays', key: 'leaveDays' },
    { title: 'Comp Off Hours', dataIndex: 'compOffHours', key: 'compOffHours' },
    { title: 'Actual Hours', dataIndex: 'actualHours', key: 'actualHours' },
    { title: 'Total Unproductive Hours', dataIndex: 'totalUnproductiveHours', key: 'totalUnproductiveHours' },
    { title: 'Planned Hours', dataIndex: 'plannedHours', key: 'plannedHours' },
    { title: 'STD Allowed (SHA)', dataIndex: 'stdAllowedSHA', key: 'stdAllowedSHA' },
    { title: 'Rejected Hrs (SH)', dataIndex: 'rejectedHrs', key: 'rejectedHrs' },
    { title: 'STD Hrs (SH)', dataIndex: 'stdHrsSH', key: 'stdHrsSH' },
    { title: 'Efficiency E = SH/PH (%)', dataIndex: 'efficiencyE', key: 'efficiencyE' },
    { title: 'Efficiency E = SH/PH (NR)', dataIndex: 'efficiencyESH', key: 'efficiencyESH' },
    { title: 'Average Eff (%)', dataIndex: 'averageEff', key: 'averageEff' },
    { title: 'Output Grp', dataIndex: 'outputGrp', key: 'outputGrp' },
    { title: 'Round', dataIndex: 'round', key: 'round' },
    { title: 'Missing', dataIndex: 'missing', key: 'missing' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button className='text-white bg-persian-green-600' onClick={() => showModal(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.ecCode)} danger>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-2">
    <h1 className="text-2xl font-semibold items-center text-center mb-2">Incentives Calculations</h1>
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
              <Button className='text-white bg-persian-green-600' icon={<ExportOutlined />} onClick={handleExport} style={{ width: '100%' }}>
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
      {/* <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2"> */}
          {/* <div className="w-8 h-8">
            <svg viewBox="0 0 24 24" className="w-full h-full text-indigo-600">
              <path fill="currentColor" d="M21,18H24V20H21V18M17,18H20V20H17V18M13,18H16V20H13V18M9,18H12V20H9V18M5,18H8V20H5V18M1,18H4V20H1V18M3,4H21V16H3V4M5,6V14H19V6H5Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold">Incentives Calculations</h1> */}
        {/* </div> */}
        {/* <div className="space-x-4">
          <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal(null)}>
            Add
          </Button>
          <Upload 
            accept=".xlsx, .xls" 
            showUploadList={false} 
            beforeUpload={handleUpload} 
            style={{ marginLeft: '8px' }}
          >
            <Button icon={<InboxOutlined />}>Upload Excel to add data</Button>
          </Upload>
        </div> */}
      {/* </div> */}

      <Col span={24}>
        <Table 
          columns={columns} 
          dataSource={filteredData}
          scroll={{ x: 'max-content' }}
          pagination={{ 
            current: currentPage, 
            pageSize: pageSize, 
            total: filteredData.length, 
            onChange: (page, size) => {
              setCurrentPage(page); // Handle page change
              setPageSize(size); // Handle page size change
            },
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20'],
            showTotal: (total) => `Total ${total} items`, // Display total count
          }}
          bordered
          size="small"
          rowKey="ecCode"
          onChange={handleTableChange} // Handle table change
        />
     </Col>
     </Row>
     </Card>


     <Modal
  title={editingRecord ? "Edit Calculation" : "Add Calculation"}
  visible={isModalVisible}
  onOk={handleOk}
  onCancel={() => setIsModalVisible(false)}
  width="80%"
  centered
>
  <Form form={form} layout="horizontal">
    {/* First Row */}
    <Row gutter={16}>
      <Col span={6}>
        <Form.Item name="ecCode" label="EC Code" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="department" label="Department" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="costCentre" label="Cost Centre" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
    </Row>

    {/* Second Row */}
    <Row gutter={16}>
      <Col span={6}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="totalHours" label="Total Hours" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="leaveDays" label="Leave Days" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="compOffHours" label="Comp Off Hours" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
    </Row>

    {/* Third Row */}
    <Row gutter={16}>
      <Col span={6}>
        <Form.Item name="actualHours" label="Actual Hours" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="totalUnproductiveHours" label="Total Unproductive Hours" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="plannedHours" label="Planned Hours" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="stdAllowedSHA" label="STD Allowed (SHA)" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
    </Row>

    {/* Fourth Row */}
    <Row gutter={16}>
      <Col span={6}>
        <Form.Item name="rejectedHrs" label="Rejected Hrs (SH)" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="stdHrsSH" label="STD Hrs (SH)" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="efficiencyE" label="Efficiency E = SH/PH (%)" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="efficiencyESH" label="Efficiency E = SH/PH (NR)" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
    </Row>

    {/* Fifth Row */}
    <Row gutter={16}>
      <Col span={6}>
        <Form.Item name="averageEff" label="Average Eff (%)" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="outputGrp" label="Output Grp" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="round" label="Round" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="missing" label="Missing" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
    </Row>
  </Form>
</Modal>
    </div>

  );
};

export default Incentives;