import React, { useState } from 'react';
import { Card, Row, Col, Form, Input, Select, DatePicker } from 'antd';
import moment from 'moment'; // Import moment for date handling

const { Option } = Select;

const ViewUserJobCards = () => {
  const [form] = Form.useForm();
  const [activityCodes] = useState([
    // Sample data structure matching the image
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
      name: 'N V Reddy',
      eoNo: '249',
      cc: '231',
      shift: '2nd',
      date: '30/07/24',
      productionDetails: [
        {
          activityCode: 'AC002',
          mcType: 'M/C Type B',
          fwoNo: 'FWO124',
          timeTaken: '3 hours',
          quantity: 2,
          status: 'Complete'
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
      documentCode: 'FIF/028/1'
    },
    // Add more sample data as needed
  ]);
  
  const [nameSearchTerm, setNameSearchTerm] = useState(''); // State for name search term
  const [eoNoSearchTerm, setEoNoSearchTerm] = useState(''); // State for EO No search term
  const [selectedShift, setSelectedShift] = useState(''); // State for selected shift
  const [selectedStatus, setSelectedStatus] = useState(''); // State for selected status
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date

  const handleNameSearch = (e) => {
    setNameSearchTerm(e.target.value); // Update name search term on input change
  };

  const handleEoNoSearch = (e) => {
    setEoNoSearchTerm(e.target.value); // Update EO No search term on input change
  };

  const handleShiftChange = (value) => {
    setSelectedShift(value); // Update selected shift
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value); // Update selected status
  };

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString); // Update selected date
  };

  // Filter the data based on the search terms and selected filters
  const filteredData = activityCodes.filter(card => 
    (card.name.toLowerCase().includes(nameSearchTerm.toLowerCase()) || 
    card.eoNo.toLowerCase().includes(eoNoSearchTerm.toLowerCase())) &&
    (selectedShift ? card.shift === selectedShift : true) &&
    (selectedStatus ? card.productionDetails[0].status === selectedStatus : true) &&
    (selectedDate ? moment(card.date, 'DD/MM/YY').isSame(moment(selectedDate, 'YYYY-MM-DD'), 'day') : true) // Date filter
  );

  return (
    <div className="p-2">
      <h1 className="text-xl md:text-3xl font-bold text-center text-persian-green-950 mb-4">View My Job Cards</h1>
      
      <Input 
        placeholder="Search by Name" 
        value={nameSearchTerm} 
        onChange={handleNameSearch} 
        style={{ marginBottom: '16px' }} 
      />
      
      <Input 
        placeholder="Search by EO No" 
        value={eoNoSearchTerm} 
        onChange={handleEoNoSearch} 
        style={{ marginBottom: '16px' }} 
      />
      
      <Select 
        placeholder="Select Shift" 
        onChange={handleShiftChange} 
        style={{ width: '200px', marginBottom: '16px', marginRight: '16px' }}
      >
        <Option value="">All</Option>
        <Option value="1st">1st</Option>
        <Option value="2nd">2nd</Option>
        {/* Add more shifts as necessary */}
      </Select>

      <Select 
        placeholder="Select Status" 
        onChange={handleStatusChange} 
        style={{ width: '200px', marginBottom: '16px' }}
      >
        <Option value="">All</Option>
        <Option value="Complete">Complete</Option>
        <Option value="Incomplete">Incomplete</Option>
        {/* Add more statuses as necessary */}
      </Select>

      <DatePicker 
        placeholder="Select Date" 
        onChange={handleDateChange} 
        style={{ marginBottom: '16px' }} 
      />

      <Row gutter={[16, 16]}>
        {filteredData.map(card => (
          <Col span={24} key={card.id}>
            <Card title={`Job Card - ${card.name}`} bordered>
              <p><strong>EO No:</strong> {card.eoNo}</p>
              <p><strong>CC:</strong> {card.cc}</p>
              <p><strong>Shift:</strong> {card.shift}</p>
              <p><strong>Date:</strong> {card.date}</p>
              <p><strong>Status:</strong> {card.productionDetails[0].status}</p>
              <p><strong>Time Taken:</strong> {card.productionDetails[0].timeTaken}</p>
              <p><strong>Quantity:</strong> {card.productionDetails[0].quantity}</p>
              {/* Add more fields as necessary */}
            </Card>
          </Col>
        ))}
      </Row>
      {/* Pagination can be added here if needed */}
    </div>
  );
};

export default ViewUserJobCards;