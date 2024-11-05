import React, { useState } from 'react';
import { Table, Button, Space, Tag, Card, Row, Col, Form, Input, Select, Modal, Upload } from 'antd';
import { PlusOutlined, ExportOutlined, FilterOutlined, EditOutlined, DeleteOutlined, InboxOutlined} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import  '../../assets/css/tableHeader.css'

const ViewAllactivityCodes = () => {
  const [form] = Form.useForm();
  
  // Sample data structure matching the image
  const [activityCodes, setActivityCodes] = useState([
    {
      id: 1,
      name: 'N V Reddy',
      eoNo: '248',
      cc: '230',
      shift: '1st',
      date: '31/07/24',
      productionDetails: [
        {
          activityCode: 'AC001',
          mcType: 'M/C Type A',
          fwoNo: 'FWO123',
          timeTaken: '2 hours',
          quantity: 1,
          status: 'Incomplete'
        }
      ],
      downTimeDetails: {
        rework: 'content',
        cleaning: 'content',
        materialShortage: 'content',
        noLoad: 'content',
        activityWithoutCode: 'content',
        newJobSetup: 'content',
        leaves: 'content',
        powerFailure: 'content',
        machineBreakdown: 'content',
        overTime: 'content',
        others: 'content'
      },
      remarks: '',
      documentCode: 'FIF/028/0'
    },
    {
      id: 2,
      name: 'Manjunath',
      eoNo: '208',
      cc: '235',
      shift: '1st',
      date: '1/08/24',
      productionDetails: [
        {
          activityCode: 'AC002',
          mcType: 'M/C Type A',
          fwoNo: 'FWO123',
          timeTaken: '1 hours',
          quantity: 1,
          status: 'Completed'
        }
      ],
      downTimeDetails: {
        rework: 'a',
        cleaning: 'a',
        materialShortage: 'a',
        noLoad: 'a',
        activityWithoutCode: 'a',
        newJobSetup: 'a',
        leaves: 'a',
        powerFailure: 'a',
        machineBreakdown: 'a',
        overTime: 'a',
        others: 'a'
      },
      remarks: 'a',
      documentCode: 'FIF/028/0'
    },
    {
      id: 3,
      name: 'Ranganna',
      eoNo: '248',
      cc: '235',
      shift: '2st',
      date: '1/08/24',
      productionDetails: [
        {
          activityCode: 'AC002',
          mcType: 'M/C Type A',
          fwoNo: 'FWO123',
          timeTaken: '1 hours',
          quantity: 1,
          status: 'Completed'
        }
      ],
      downTimeDetails: {
        rework: 'a',
        cleaning: 'a',
        materialShortage: 'a',
        noLoad: 'a',
        activityWithoutCode: 'a',
        newJobSetup: 'a',
        leaves: 'a',
        powerFailure: 'a',
        machineBreakdown: 'a',
        overTime: 'a',
        others: 'a'
      },
      remarks: 'a',
      documentCode: 'FIF/028/0'
    },
    {
      id: 4,
      name: 'Ranjan',
      eoNo: '108',
      cc: '235',
      shift: '2st',
      date: '1/08/24',
      productionDetails: [
        {
          activityCode: 'AC003',
          mcType: 'M/C Type A',
          fwoNo: 'FWO123',
          timeTaken: '1 hours',
          quantity: 1,
          status: 'Completed'
        }
      ],
      downTimeDetails: {
        rework: 'a',
        cleaning: 'a',
        materialShortage: 'a',
        noLoad: 'a',
        activityWithoutCode: 'a',
        newJobSetup: 'a',
        leaves: 'a',
        powerFailure: 'a',
        machineBreakdown: 'a',
        overTime: 'a',
        others: 'a'
      },
      remarks: 'a',
      documentCode: 'FIF/028/0'
    },
    {
      id: 5,
      name: 'Gangadar',
      eoNo: '208',
      cc: '235',
      shift: '2st',
      date: '1/08/24',
      productionDetails: [
        {
          activityCode: 'AC004',
          mcType: 'M/C Type A',
          fwoNo: 'FWO123',
          timeTaken: '1 hours',
          quantity: 1,
          status: 'Completed'
        }
      ],
      downTimeDetails: {
        rework: 'a',
        cleaning: 'a',
        materialShortage: 'a',
        noLoad: 'a',
        activityWithoutCode: 'a',
        newJobSetup: 'a',
        leaves: 'a',
        powerFailure: 'a',
        machineBreakdown: 'a',
        overTime: 'a',
        others: 'a'
      },
      remarks: 'a',
      documentCode: 'FIF/028/0'
    },
  ]);

  
  // Added state for pagination
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [pageSize, setPageSize] = useState(10); // Track the number of items per page
  const [verificationStatus, setVerificationStatus] = useState(activityCodes.map((_, index) => {
    // Check for duplicates based on activity code and status
    const currentActivityCode = activityCodes[index].productionDetails[0].activityCode;
    const currentStatus = activityCodes[index].productionDetails[0].status;
  
    const duplicateRows = activityCodes.filter(item => 
      item.productionDetails[0].activityCode === currentActivityCode && 
      item.productionDetails[0].status === currentStatus
    );
  
    return duplicateRows.length > 1 ? 'Pending' : 'Approved';
  }));
  
  // Edit modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  
  const handleEditClick = (record) => {
    setEditingRecord(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingCard) {
        // Update existing card
        setActivityCodes(prev => prev.map(card => (card.ecNo === editingCard.ecNo ? { ...card, ...values } : card)));
      } else {
        // Create new card
        const newCard = { ...values }; // Use manual EC No
        setActivityCodes(prev => [...prev, newCard]);
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleDelete = (ecNo) => {
    setActivityCodes(prev => prev.filter(card => card.ecNo !== ecNo));
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current); // Update current page on change
    setPageSize(pagination.pageSize); // Update page size on change
  };

  const handleVerifyClick = (index) => {
    setVerificationStatus((prevStatus) =>
        prevStatus.map((status, idx) => (idx === index ? 'Approved' : status))
    );
    setActivityCodes((prevCodes) =>
        prevCodes.map((code, idx) => (idx === index ? { ...code, isVerified: true } : code))
    );
};


 // Updated handleUpload function with proper data transformation
 const handleUpload = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    
    // Transform the Excel data to match the expected structure
    const transformedData = rawData.map((row, index) => ({
      id: activityCodes.length + index + 1, // Generate new unique IDs
      name: row.name || '',
      eoNo: row.eoNo?.toString() || '',
      cc: row.cc?.toString() || '',
      shift: row.shift || '',
      date: row.date || '',
      productionDetails: [{
        activityCode: row.activityCode || '',
        mcType: row.mcType || '',
        fwoNo: row.fwoNo || '',
        timeTaken: row.timeTaken || '',
        quantity: row.quantity || 0,
        status: row.status || ''
      }],
      downTimeDetails: {
        rework: row.rework || '',
        cleaning: row.cleaning || '',
        materialShortage: row.materialShortage || '',
        noLoad: row.noLoad || '',
        activityWithoutCode: row.activityWithoutCode || '',
        newJobSetup: row.newJobSetup || '',
        leaves: row.leaves || '',
        powerFailure: row.powerFailure || '',
        machineBreakdown: row.machineBreakdown || '',
        overTime: row.overTime || '',
        others: row.others || ''
      },
      remarks: row.remarks || '',
      documentCode: row.documentCode || ''
    }));

    // Update the state with the new transformed data
    setActivityCodes(prevCodes => [...prevCodes, ...transformedData]);
    
    // Update verification status for new entries
    setVerificationStatus(prevStatus => [
      ...prevStatus,
      ...transformedData.map(() => 'Pending')
    ]);
  };
  reader.readAsArrayBuffer(file);
  return false; // Prevent default upload behavior
};

const handleModalOk = () => {
  // Update the editing record in the activityCodes state
  // Implement your logic to save the edited data
  setIsModalVisible(false);
};

const handleModalCancel = () => {
  setIsModalVisible(false);
};

  const columns = [
    {
      title: 'Production Details',
      children: [
        {
          title: 'Activity Code No',
          dataIndex: ['productionDetails', 0, 'activityCode'],
          key: 'activityCode',
          width: 150,
          filters: activityCodes.map(card => ({ text: card.productionDetails[0].activityCode, value: card.productionDetails[0].activityCode })),
          onFilter: (value, record) => record.productionDetails[0].activityCode.includes(value),
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width: 150,
          filters: activityCodes.map(card => ({ text: card.name, value: card.name })),
          onFilter: (value, record) => record.name.includes(value),
        },
        {
          title: 'EO No',
          dataIndex: 'eoNo',
          key: 'eoNo',
          width: 100,
          filters: activityCodes.map(card => ({ text: card.eoNo, value: card.eoNo })),
          onFilter: (value, record) => record.eoNo.includes(value),
        },
        {
          title: 'CC',
          dataIndex: 'cc',
          key: 'cc',
          width: 100,
          filters: activityCodes.map(card => ({ text: card.cc, value: card.cc })),
          onFilter: (value, record) => record.cc.includes(value),
        },
        {
          title: 'Shift',
          dataIndex: 'shift',
          key: 'shift',
          width: 100,
          filters: activityCodes.map(card => ({ text: card.shift, value: card.shift })),
          onFilter: (value, record) => record.shift.includes(value),
        },
        {
          title: 'M/c Type',
          dataIndex: ['productionDetails', 0, 'mcType'],
          key: 'mcType',
          width: 150,
          filters: activityCodes.map(card => ({ text: card.productionDetails[0].mcType, value: card.productionDetails[0].mcType })),
          onFilter: (value, record) => record.productionDetails[0].mcType.includes(value),
        },
        {
          title: 'FWO No',
          dataIndex: ['productionDetails', 0, 'fwoNo'],
          key: 'fwoNo',
          width: 150,
          filters: activityCodes.map(card => ({ text: card.productionDetails[0].fwoNo, value: card.productionDetails[0].fwoNo })),
          onFilter: (value, record) => record.productionDetails[0].fwoNo.includes(value),
        },
        {
          title: 'Time Taken',
          dataIndex: ['productionDetails', 0, 'timeTaken'],
          key: 'timeTaken',
          width: 150,
          filters: activityCodes.map(card => ({ text: card.productionDetails[0].timeTaken, value: card.productionDetails[0].timeTaken })),
          onFilter: (value, record) => record.productionDetails[0].timeTaken.includes(value),
        },
        {
          title: 'Quantity',
          dataIndex: ['productionDetails', 0, 'quantity'],
          key: 'quantity',
          width: 100,
          filters: activityCodes.map(card => ({ text: card.productionDetails[0].quantity, value: card.productionDetails[0].quantity })),
          onFilter: (value, record) => record.productionDetails[0].quantity.toString().includes(value),
        },
        {
          title: 'Status',
          dataIndex: ['productionDetails', 0, 'status'],
          key: 'status',
          width: 120,
          filters: activityCodes.map(card => ({ text: card.productionDetails[0].status, value: card.productionDetails[0].status })),
          onFilter: (value, record) => record.productionDetails[0].status.includes(value),
        },
      ],
    },
    {
      title: 'Down Time Details',
      children: [
        {
          title: 'Rework',
          dataIndex: ['downTimeDetails', 'rework'],
          key: 'rework',
          width: 120,
          filters: activityCodes.map(card => ({ text: card.downTimeDetails.rework, value: card.downTimeDetails.rework })),
          onFilter: (value, record) => record.downTimeDetails.rework.includes(value),
        },
        {
          title: 'Cleaning',
          dataIndex: ['downTimeDetails', 'cleaning'],
          key: 'cleaning',
          width: 120,
          filters: activityCodes.map(card => ({ text: card.downTimeDetails.cleaning, value: card.downTimeDetails.cleaning })),
          onFilter: (value, record) => record.downTimeDetails.cleaning.includes(value),
        },
        {
          title: 'Material Shortage',
          dataIndex: ['downTimeDetails', 'materialShortage'],
          key: 'materialShortage',
          width: 150,
          filters: activityCodes.map(card => ({ text: card.downTimeDetails.materialShortage, value: card.downTimeDetails.materialShortage })),
          onFilter: (value, record) => record.downTimeDetails.materialShortage.includes(value),
        },
        {
          title: 'No Load',
          dataIndex: ['downTimeDetails', 'noLoad'],
          key: 'noLoad',
          width: 120,
          filters: activityCodes.map(card => ({ text: card.downTimeDetails.noLoad, value: card.downTimeDetails.noLoad })),
          onFilter: (value, record) => record.downTimeDetails.noLoad.includes(value),
        },
        {
          title: 'Activity without code',
          dataIndex: ['downTimeDetails', 'activityWithoutCode'],
          key: 'activityWithoutCode',
          width: 170,
          filters: activityCodes.map(card => ({ text: card.downTimeDetails.activityWithoutCode, value: card.downTimeDetails.activityWithoutCode })),
          onFilter: (value, record) => record.downTimeDetails.activityWithoutCode.includes(value),
        },
        {
          title: 'New Job Setup',
          dataIndex: ['downTimeDetails', 'newJobSetup'],
          key: 'newJobSetup',
          width: 140,
          filters: activityCodes.map(card => ({ text: card.downTimeDetails.newJobSetup, value: card.downTimeDetails.newJobSetup })),
          onFilter: (value, record) => record.downTimeDetails.newJobSetup.includes(value),
        },
        {
          title: 'Leaves',
          dataIndex: ['downTimeDetails', 'leaves'],
          key: 'leaves',
          width: 120,
          filters: activityCodes.map(card => ({ text: card.downTimeDetails.leaves, value: card.downTimeDetails.leaves })),
          onFilter: (value, record) => record.downTimeDetails.leaves.includes(value),
        },
        {
          title: 'Power Failure',
          dataIndex: ['downTimeDetails', 'powerFailure'],
          key: 'powerFailure',
          width: 130,
          filters: activityCodes.map(card => ({ text: card.downTimeDetails.powerFailure, value: card.downTimeDetails.powerFailure })),
          onFilter: (value, record) => record.downTimeDetails.powerFailure.includes(value),
        },
        {
          title: 'Machine Breakdown',
          dataIndex: ['downTimeDetails', 'machineBreakdown'],
          key: 'machineBreakdown',
          width: 160,
          filters: activityCodes.map(card => ({ text: card.downTimeDetails.machineBreakdown, value: card.downTimeDetails.machineBreakdown })),
          onFilter: (value, record) => record.downTimeDetails.machineBreakdown.includes(value),
        },
        {
          title: 'Over Time',
          dataIndex: ['downTimeDetails', 'overTime'],
          key: 'overTime',
          width: 120,
          filters: activityCodes.map(card => ({ text: card.downTimeDetails.overTime, value: card.downTimeDetails.overTime })),
          onFilter: (value, record) => record.downTimeDetails.overTime.includes(value),
        },
        {
          title: 'Others',
          dataIndex: ['downTimeDetails', 'others'],
          key: 'others',
          width: 120,
          filters: activityCodes.map(card => ({ text: card.downTimeDetails.others, value: card.downTimeDetails.others })),
          onFilter: (value, record) => record.downTimeDetails.others.includes(value),
        },
      ],
    },
    {
      title: 'Verify',
      dataIndex: 'verify',
      key: 'verify',
      width: 100,
      filters: [
        { text: 'Approved', value: 'Approved' },
        { text: 'Pending', value: 'Pending' },
      ],
      onFilter: (value, record) => {
        const index = activityCodes.findIndex(item => item.id === record.id);
        return verificationStatus[index] === value;
      },
      render: (text, record, index) => {
        const indexInStatus = activityCodes.findIndex(item => item.id === record.id);
        const statusText = verificationStatus[indexInStatus];
        // Use actual color values instead of Tailwind classes
        const bgColor = statusText === 'Approved' ? '#22c55e' : '#ef4444'; // green-500 and red-500 color values
    
        return (
          <Button 
            onClick={() => handleVerifyClick(indexInStatus)}
            className="text-white w-full hover:opacity-80" // Added hover effect
            style={{ 
              backgroundColor: bgColor,
              color: 'white',
              width: '100%',
            }}
          >
            {statusText}
          </Button>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button className='text-white bg-persian-green-600' onClick={() => handleEditClick(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.ecNo)} danger>Delete</Button>
        </Space>
      ),
    },
    
  ];

// Function to handle export to Excel
const exportToExcel = () => {
  const flattenedData = activityCodes.map(card => ({
    activityCode: card.productionDetails[0].activityCode,
    name: card.name,
    eoNo: card.eoNo,
    cc: card.cc,
    shift: card.shift,
    date: card.date,
    mcType: card.productionDetails[0].mcType,
    fwoNo: card.productionDetails[0].fwoNo,
    timeTaken: card.productionDetails[0].timeTaken,
    quantity: card.productionDetails[0].quantity,
    status: card.productionDetails[0].status,
    rework: card.downTimeDetails.rework,
    cleaning: card.downTimeDetails.cleaning,
    materialShortage: card.downTimeDetails.materialShortage,
    noLoad: card.downTimeDetails.noLoad,
    activityWithoutCode: card.downTimeDetails.activityWithoutCode,
    newJobSetup: card.downTimeDetails.newJobSetup,
    leaves: card.downTimeDetails.leaves,
    powerFailure: card.downTimeDetails.powerFailure,
    machineBreakdown: card.downTimeDetails.machineBreakdown,
    overTime: card.downTimeDetails.overTime,
    others: card.downTimeDetails.others,
    remarks: card.remarks,
    documentCode: card.documentCode,
  }));

  const ws = XLSX.utils.json_to_sheet(flattenedData); // Convert flattened data to a worksheet
  const wb = XLSX.utils.book_new(); // Create a new workbook
  XLSX.utils.book_append_sheet(wb, ws, 'View All Job Cards'); // Append the worksheet to the workbook
  XLSX.writeFile(wb, 'ViewAllJobCards.xlsx'); // Export the workbook as an Excel file
};

const paginationOptions = {
  current: currentPage, // Use the state for current page
  pageSize: pageSize, // Use the state for page size
  total: activityCodes.length, // Total number of items
  onChange: (page, size) => {
    setCurrentPage(page); // Handle page change
    setPageSize(size); // Handle page size change
  },
  showSizeChanger: true, // Show page size changer
  pageSizeOptions: ['5', '10', '20'], // Options for page size
};

  // Calculate the data to be displayed on the current page
  const paginatedData = activityCodes.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const rowClassName = (record) => {
    const currentActivityCode = record.productionDetails[0].activityCode;
    const currentStatus = record.productionDetails[0].status;
    
    // Find index of current record
    const currentIndex = activityCodes.findIndex(item => item.id === record.id);
    
    // Only apply red background if it's a duplicate AND not yet approved
    const duplicateRows = activityCodes.filter(item => 
        item.productionDetails[0].activityCode === currentActivityCode && 
        item.productionDetails[0].status === currentStatus
    );
    
    // Check if this row is verified/approved
    const isApproved = verificationStatus[currentIndex] === 'Approved';
    
    // Only return bg-red-100 if it's a duplicate AND not approved
    return duplicateRows.length > 1 && !isApproved ? 'bg-red-100' : '';
};
  
  return (
    <div className="p-2">
       <h1 className="text-2xl font-semibold items-center text-center mb-4">View All Job Cards</h1>
      <Card>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            {/* <Space className="w-full justify-between">
              <Space>
                <Form form={form} layout="inline">
                  <Form.Item label="Name" name="name">
                    <Input defaultValue="N V Reddy" />
                  </Form.Item>
                  <Form.Item label="EO No" name="eoNo">
                    <Input defaultValue="248" />
                  </Form.Item>
                  <Form.Item label="CC" name="cc">
                    <Input defaultValue="230" />
                  </Form.Item>
                  <Form.Item label="Shift" name="shift">
                    <Select defaultValue="1st" style={{ width: 120 }}>
                      <Select.Option value="1st">1st</Select.Option>
                      <Select.Option value="2nd">2nd</Select.Option>
                      <Select.Option value="3rd">3rd</Select.Option>
                    </Select>
                  </Form.Item>
                </Form>
              </Space> */}
               <Space>
               <Button className='text-white bg-persian-green-600' icon={<PlusOutlined />} onClick={() => showModal(null)} style={{ width: '100%' }}>
                Add 
              </Button>
              <Button className='text-white bg-persian-green-600' icon={<ExportOutlined />} onClick={exportToExcel}>
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
            {/* </Space> */}
          </Col>
          
          <Col span={24}>
          <Table 
          className='table-header'
            columns={columns} 
            dataSource={paginatedData}
            rowClassName={rowClassName}  // Use paginated data for display
            scroll={{ x: 'max-content' }}
            pagination={{ 
              current: currentPage, 
              pageSize: pageSize, // Use the state for page size
              total: activityCodes.length, // Total number of items
              onChange: (page, size) => {
                setCurrentPage(page); // Handle page change
                setPageSize(size); // Handle page size change
              },
              showSizeChanger: true, // Show page size changer
              pageSizeOptions: ['5', '10', '20'], // Options for page size
              showTotal: (total) => `Total ${total} items`, // Display total count
            }}
            bordered
            size="small"
            rowKey="activityCode" // Use EC No as the unique key
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
  <Form form={form} layout="horizontal" initialValues={editingRecord}>
    {/* First Row */}
    <Row gutter={16}>
      <Col span={6}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="eoNo" label="EO No" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="cc" label="CC" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="shift" label="Shift" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="1st">1st</Select.Option>
            <Select.Option value="2nd">2nd</Select.Option>
            <Select.Option value="3rd">3rd</Select.Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>

    {/* Second Row */}
    <Row gutter={16}>
      <Col span={6}>
        <Form.Item name={['productionDetails', 0, 'activityCode']} label="Activity Code No" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name={['productionDetails', 0, 'mcType']} label="M/c Type" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name={['productionDetails', 0, 'fwoNo']} label="FWO No" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name={['productionDetails', 0, 'timeTaken']} label="Time Taken" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
    </Row>

    {/* Third Row */}
    <Row gutter={16}>
      <Col span={6}>
        <Form.Item name={['productionDetails', 0, 'quantity']} label="Quantity" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name={['productionDetails', 0, 'status']} label="Status" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name={['downTimeDetails', 'rework']} label="Rework" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name={['downTimeDetails', 'cleaning']} label="Cleaning" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
    </Row>

    {/* Fourth Row */}
    <Row gutter={16}>
      <Col span={6}>
        <Form.Item name={['downTimeDetails', 'materialShortage']} label="Material Shortage" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name={['downTimeDetails', 'noLoad']} label="No Load" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name={['downTimeDetails', 'activityWithoutCode']} label="Activity without code" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name={['downTimeDetails', 'newJobSetup']} label="New Job Setup" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
    </Row>

    {/* Fifth Row */}
    <Row gutter={16}>
      <Col span={6}>
        <Form.Item name={['downTimeDetails', 'leaves']} label="Leaves" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name={['downTimeDetails', 'powerFailure']} label="Power Failure" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name={['downTimeDetails', 'machineBreakdown']} label="Machine Breakdown" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name={['downTimeDetails', 'overTime']} label="Over Time" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
    </Row>

    {/* Additional Fields */}
    <Row gutter={16}>
      <Col span={6}>
        <Form.Item name={['downTimeDetails', 'others']} label="Others" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
    </Row>
  </Form>
</Modal>
    </div>
  );
};

export default ViewAllactivityCodes;