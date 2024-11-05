import React, { useState } from 'react';
import { Table, Button, Space, Tag, Card, Row, Col, Form, Input, Select } from 'antd';
import { PlusOutlined, ExportOutlined, FilterOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const ViewAllactivityCodes = () => {
  const [form] = Form.useForm();

  // Sample data structure matching the image
  const [activityCodes] = useState([
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
      shift: '2st',
      date: '1/08/24',
      productionDetails: [
        {
          activityCode: 'AC001',
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
      id: 2,
      name: 'Manjunath',
      eoNo: '208',
      cc: '235',
      shift: '2st',
      date: '1/08/24',
      productionDetails: [
        {
          activityCode: 'AC001',
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
          activityCode: 'AC001',
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
          activityCode: 'AC001',
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

  const [verificationStatus, setVerificationStatus] = useState(
    activityCodes.map(() => 'Pending') // Initialize all as 'Pending'
  );

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current); // Update current page on change
    setPageSize(pagination.pageSize); // Update page size on change
  };

  const handleVerifyClick = (index) => {
    const newStatus = verificationStatus[index] === 'Pending' ? 'Approved' : 'Pending';
    const newVerificationStatus = [...verificationStatus];
    newVerificationStatus[index] = newStatus;
    setVerificationStatus(newVerificationStatus);
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
      render: (text, record, index) => (
        <Button 
          onClick={() => handleVerifyClick(index)} 
          style={{ 
            backgroundColor: verificationStatus[index] === 'Approved' ? 'green' : 'red', 
            color: 'white' 
          }}
        >
          {verificationStatus[index]}
        </Button>
      ),
    },
  ];

// Function to handle export to Excel
const exportToExcel = () => {
  const flattenedData = activityCodes.map(card => ({
    id: card.id,
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

const rowClassName = (record, index) => {
  return verificationStatus[index] === 'Approved' ? 'row-approved' : '';
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
              <Button className='text-white bg-persian-green-600' icon={<ExportOutlined />} onClick={exportToExcel}>
                Export to Excel
              </Button>
            </Space>
            {/* </Space> */}
          </Col>
          
          <Col span={24}>
          <Table 
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
    </div>
  );
};

export default ViewAllactivityCodes;