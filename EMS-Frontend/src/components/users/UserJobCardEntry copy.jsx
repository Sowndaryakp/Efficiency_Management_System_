// src/components/users/UserJobCardEntry.jsx
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form'; // Importing react-hook-form
import buhler from '../../assets/buhler.png';

const JobCard = () => {
  const [signature, setSignature] = useState(''); // State to hold signature input
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [file, setFile] = useState(null); // State to hold the uploaded file
  const [signatureData, setSignatureData] = useState(null); 
  const [currentDate, setCurrentDate] = useState('');
  const [showDowntimePopup, setShowDowntimePopup] = useState(false); // State to manage Downtime popup visibility
  const [downtimeToggles, setDowntimeToggles] = useState({
    rework: false,
    cleaning: false,
    materialShortage: false,
    noLoad: false,
    activityWithoutCode: false,
    newJobSetup: false,
    leaves: false,
    powerFailure: false,
    machineBreakdown: false,
    overTime: false,
    others: false,
  });
  const [downtimeInputs, setDowntimeInputs] = useState({});
  const [selectedShift, setSelectedShift] = useState("Select Shift");
  const [activityCode, setActivityCode] = useState(""); // State for Activity Code
  const [machineType, setMachineType] = useState(""); // State for Machine Type
  const [fwoNumber, setFwoNumber] = useState(""); // State for FWO Number

  const handleShiftChange = (e) => {
    setSelectedShift(e.target.value);
  };
  
  useEffect(() => {
    setCurrentDate(new Date().toISOString().split('T')[0]); // Set current date on mount
  }, []);
  
  const handleSignatureChange = (event) => {
    setSignature(event.target.value); // Update signature state
  };

  const handleSignatureUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile); // Store the uploaded file
    }
  };

  const handleOk = () => {
    // Check if either signature name or file is provided
    if (signature || file) {
        setSignatureData({ name: signature || '', file: file ? URL.createObjectURL(file) : null }); // Store signature data
        setShowModal(false); // Close the modal
        // Reset fields if necessary
        setSignature('');
        setFile(null);
    } else {
        alert('Please enter a signature name or upload an image.'); // Alert if both are empty
    }
  };

  const [subEngrSignatureData, setSubEngrSignatureData] = useState(null); // State to hold Sub/Engr signature data
  const [subEngrSignature, setSubEngrSignature] = useState(''); // State to hold Sub/Engr signature input
  const [showSubEngrModal, setShowSubEngrModal] = useState(false); // State to control Sub/Engr modal visibility
  const [subEngrFile, setSubEngrFile] = useState(null); // State to hold the uploaded Sub/Engr file

  const handleSubEngrSignatureChange = (event) => {
    setSubEngrSignature(event.target.value); // Update Sub/Engr signature state
  };

  const handleSubEngrSignatureUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
        setSubEngrFile(uploadedFile); // Store the uploaded Sub/Engr file
    }
  };

  const handleSubEngrOk = () => {
    // Check if either Sub/Engr signature name or file is provided
    if (subEngrSignature || subEngrFile) {
        setSubEngrSignatureData({ name: subEngrSignature || '', file: subEngrFile ? URL.createObjectURL(subEngrFile) : null }); // Store Sub/Engr signature data
        setShowSubEngrModal(false); // Close the modal
        // Reset fields if necessary
        setSubEngrSignature('');
        setSubEngrFile(null);
    } else {
        alert('Please enter a signature name or upload an image.'); // Alert if both are empty
    }
  };

  // State for editable fields
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      employeeDetails:  [
        { name: 'N V Reddy', ecNo: '248', cc: '230', shift: '1st' }, // Added default values for employee details
      ],
      productionDetails: [
        { code: 'AC001', type: 'M/c Type A', fwo: 'FWO123', time: '2 hours', qty: '1' },
      ],
      downtimeDetails: [ // Added default values for downtime details
        { rework: 'content', cleaning: 'content', materialShortage: 'content', noLoad: 'content', activityWithoutCode: 'content', newJobSetup: 'content', leaves: 'content', powerFailure: 'content', machineBreakdown: 'content', overTime: 'content', others: 'content' },
      ],
    },
  });
  const { fields: employeeFields, append: appendEmployee } = useFieldArray({
    control,
    name: 'employeeDetails', // New field array for employee details
  });
  const { fields: productionFields, append: appendProduction } = useFieldArray({
    control,
    name: 'productionDetails',
  });
  const { fields: downtimeFields, append: appendDowntime } = useFieldArray({ // Added useFieldArray for downtime details
    control,
    name: 'downtimeDetails',
  });

  const addEmployeeRow = () => {
    appendEmployee({ name: '', ecNo: '', cc: '', shift: '' }); // Function to add a new employee row
  };

  const addProductionRow = () => {
    appendProduction({ code: '', type: '', fwo: '', time: '', qty: '' }); // Function to add a new production row
  };

  const addDowntimeRow = () => { // Function to add a new downtime row
    appendDowntime({ rework: '', cleaning: '', materialShortage: '', noLoad: '', activityWithoutCode: '', newJobSetup: '', leaves: '', powerFailure: '', machineBreakdown: '', overTime: '', others: '' });
  };

  const onSubmit = (data) => {
    console.log(data); // Handle form submission
  };

  const toggleDowntimeField = (field) => {
    setDowntimeToggles(prev => {
      const newToggles = { ...prev, [field]: !prev[field] }; // Toggle the specified downtime field
      if (!newToggles[field]) {
        // If the checkbox is unchecked, clear the input value for that field
        setDowntimeInputs(prev => ({ ...prev, [field]: '' }));
      }
      return newToggles;
    });
  };

  const openDowntimePopup = () => {
    setShowDowntimePopup(true); // Open the downtime popup
  };
  
  const handleDowntimeInputChange = (key, value) => {
    setDowntimeInputs(prev => ({ ...prev, [key]: value })); // Update downtime input values
  };
  
  const okDowntimePopup = () => {
    // Logic to handle OK button click
    console.log(downtimeInputs); // Display the entered downtime inputs in the console
    closeDowntimePopup(); // Close the popup
  };

  const closeDowntimePopup = () => {
    setShowDowntimePopup(false); // Close the downtime popup
  };
  
  return (
    <div className="max-w-full mx-auto p-6 bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6"> {/* Added spacing for better layout */}
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6"> {/* Responsive flex direction */}
          <div className="flex items-center gap-2">
          <div className="flex flex-col md:flex-row items-center justify-center mb-4"> {/* Added flex direction for responsiveness */}
              {/* <img
                src={buhler}
                alt="Logo"
                className="h-8 md:h-10 mr-2 mb-2 md:mb-0" // Added margin for spacing and adjusted for mobile
              /> */}
              <h1 className="text-xl md:text-3xl font-bold text-center text-persian-green-950">Job Card for Technicians</h1> {/* Centered without fixed margin */}
            </div>
          </div>
          <div className="text-right">
          <input 
            type="date" 
            name="date" 
            {...register('employeeFields.date')} 
            value={currentDate} // Set value directly from state
            onChange={(e) => setCurrentDate(e.target.value)} // Update state on change
            className="text-sm w-full md:w-auto" // Responsive width
          />
          </div>
        </div>

           {/* Employee Details Card */}
          <div className="p-4 border rounded-lg shadow-md mb-6 bg-gray-50">
          <h3 className="font-bold text-lg mb-3">Employee Details</h3>
          <div className="flex flex-col space-y-4">
            {employeeFields.map((item, index) => (
              <div key={item.id} className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex flex-col w-full md:w-1/4 mb-4">
                  <label htmlFor={`employeeDetails.${index}.name`} className="font-semibold">Name : &nbsp;&nbsp;
                  <input 
                    id={`employeeDetails.${index}.name`}
                    {...register(`employeeDetails.${index}.name`)} 
                    placeholder="Enter Employee Name" 
                    className="border p-2" disabled
                  />
                  </label>
                </div>
                <div className="flex flex-col w-full md:w-1/4 mb-4">
                  <label htmlFor={`employeeDetails.${index}.ecNo`} className="font-semibold">EC No : &nbsp;&nbsp;
                  <input 
                    id={`employeeDetails.${index}.ecNo`}
                    {...register(`employeeDetails.${index}.ecNo`)} 
                    placeholder="Enter EC No" 
                    className="border p-2" 
                  /></label>
                </div>
                <div className="flex flex-col w-full md:w-1/4 mb-4">
                  <label htmlFor={`employeeDetails.${index}.cc`} className="font-semibold">CC : &nbsp;&nbsp;
                  <input 
                    id={`employeeDetails.${index}.cc`}
                    {...register(`employeeDetails.${index}.cc`)} 
                    placeholder="Enter CC" 
                    className="border p-2" 
                  /></label>
                </div>
                <div className="flex flex-col w-full md:w-1/4 mb-4">
                <label htmlFor={`employeeDetails.${index}.shift`} className="font-semibold">Shift : &nbsp;&nbsp;
                <select 
                  id={`employeeDetails.${index}.shift`}
                  {...register(`employeeDetails.${index}.shift`)} 
                  className="border p-2"
                  value={selectedShift} // Control the select value with state
                  onChange={handleShiftChange} // Update state on change
                >
                  <option value="Select Shift" disabled>Select Shift</option> {/* Make this option disabled */}
                  <option value="Morning">1st</option>
                  <option value="Afternoon">2nd</option>
                  <option value="Night">3rd</option>
                </select>
                </label>
              </div>
              </div>
            ))}
          </div>
          {/* <button type="button" onClick={addEmployeeRow} className="mt-2 px-4 py-2 bg-persian-green-700 text-white rounded">Add Row</button> */}
        </div>

        {/* Production Details Card */}
        <div className="p-4 border rounded-lg shadow-md mb-6 bg-gray-50">
          <h3 className="font-bold text-lg mb-3">Production Details</h3>
          <div className="flex flex-col space-y-4"> {/* Changed to flex column for mobile responsiveness */}
            {productionFields.map((item, index) => (
                <div key={item.id} className="flex flex-col md:flex-row md:space-x-4"> {/* Flex for horizontal layout on larger screens */}
                 <div className="flex flex-col w-full md:w-1/5 mb-4">
                <label htmlFor={`productionDetails.${index}.code`} className="font-semibold">Activity Code No:</label>
                <select 
                  id={`productionDetails.${index}.code`}
                  {...register(`productionDetails.${index}.code`)} 
                  className="border p-2"
                  value={activityCode} // Controlled component
                  onChange={(e) => setActivityCode(e.target.value)} // Update state
                >
                  <option value="" disabled>Select Activity Code</option> {/* Disabled placeholder option */}
                  <option value="AC001">AC001</option>
                  <option value="AC002">AC002</option>
                  {/* Add more options as needed */}
                </select>
              </div>

              {/* Machine Type */}
              <div className="flex flex-col w-full md:w-1/5 mb-4">
                <label htmlFor={`productionDetails.${index}.type`} className="font-semibold">M/c Type:</label>
                <select 
                  id={`productionDetails.${index}.type`}
                  {...register(`productionDetails.${index}.type`)} 
                  className="border p-2"
                  value={machineType} // Controlled component
                  onChange={(e) => setMachineType(e.target.value)} // Update state
                >
                  <option value="" disabled>Select Machine Type</option> {/* Disabled placeholder option */}
                  <option value="Type A">Type A</option>
                  <option value="Type B">Type B</option>
                  {/* Add more options as needed */}
                </select>
              </div>

              {/* FWO No */}
              <div className="flex flex-col w-full md:w-1/5 mb-4">
                <label htmlFor={`productionDetails.${index}.fwo`} className="font-semibold">FWO No:</label>
                <select 
                  id={`productionDetails.${index}.fwo`}
                  {...register(`productionDetails.${index}.fwo`)} 
                  className="border p-2"
                  value={fwoNumber} // Controlled component
                  onChange={(e) => setFwoNumber(e.target.value)} // Update state
                >
                  <option value="" disabled>Select FWO No</option> {/* Disabled placeholder option */}
                  <option value="FWO123">FWO123</option>
                  <option value="FWO456">FWO456</option>
                  {/* Add more options as needed */}
                </select>
              </div>
                <div className="flex flex-col w-full md:w-1/5 mb-4">
                  <label htmlFor={`productionDetails.${index}.time`} className="font-semibold">Time Taken:</label>
                  <input 
                    id={`productionDetails.${index}.time`}
                    {...register(`productionDetails.${index}.time`)} 
                    placeholder="Enter Time Taken" 
                    className="border p-2" 
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/5 mb-4">
                  <label htmlFor={`productionDetails.${index}.qty`} className="font-semibold">Quantity:</label>
                  <input 
                    id={`productionDetails.${index}.qty`}
                    {...register(`productionDetails.${index}.qty`)} 
                    placeholder="Enter Quantity" 
                    className="border p-2" 
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/5 mb-4">
                  <label htmlFor={`productionDetails.${index}.status`} className="font-semibold">Status:</label>
                  <select 
                    id={`productionDetails.${index}.status`}
                    {...register(`productionDetails.${index}.status`)} 
                    className="border p-2"
                  >
                    <option>Enter Status</option>
                    <option>C - Completed</option>
                    <option>IC - Incomplete</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={addProductionRow} className="mt-2 px-4 py-2 bg-persian-green-700 text-white rounded">Add Row</button>
        </div>

        {/* Downtime Details Card */}
        {/* <div className="p-4 border rounded-lg shadow-md mb-6 bg-gray-50 w-full mx-auto"> 
          <h3 className="font-bold text-lg mb-3">Downtime Details</h3>
          <div className="flex flex-col space-y-4"> 
            {downtimeFields.map((item, index) => (
              <div key={item.id} className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex flex-col w-full md:w-1/6"> 
                  <label htmlFor={`downtimeDetails.${index}.rework`} className="font-semibold">Rework:</label>
                  <input 
                    id={`downtimeDetails.${index}.rework`} 
                    {...register(`downtimeDetails.${index}.rework`)} 
                    placeholder="Enter Rework" 
                    className="border p-2" 
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/6"> 
                  <label htmlFor={`downtimeDetails.${index}.cleaning`} className="font-semibold">Cleaning / Workhead org:</label>
                  <input 
                    id={`downtimeDetails.${index}.cleaning`} 
                    {...register(`downtimeDetails.${index}.cleaning`)} 
                    placeholder="Enter Cleaning" 
                    className="border p-2" 
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/6"> 
                  <label htmlFor={`downtimeDetails.${index}.materialShortage`} className="font-semibold">Material Shortage:</label>
                  <input 
                    id={`downtimeDetails.${index}.materialShortage`} 
                    {...register(`downtimeDetails.${index}.materialShortage`)} 
                    placeholder="Enter Material Shortage" 
                    className="border p-2" 
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/6"> 
                  <label htmlFor={`downtimeDetails.${index}.noLoad`} className="font-semibold">No Load:</label>
                  <input 
                    id={`downtimeDetails.${index}.noLoad`} 
                    {...register(`downtimeDetails.${index}.noLoad`)} 
                    placeholder="Enter No Load" 
                    className="border p-2" 
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/6"> 
                  <label htmlFor={`downtimeDetails.${index}.activityWithoutCode`} className="font-semibold">Activity without code:</label>
                  <input 
                    id={`downtimeDetails.${index}.activityWithoutCode`} 
                    {...register(`downtimeDetails.${index}.activityWithoutCode`)} 
                    placeholder="Enter Activity without code" 
                    className="border p-2" 
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/6"> 
                  <label htmlFor={`downtimeDetails.${index}.newJobSetup`} className="font-semibold">New Job set up:</label>
                  <input 
                    id={`downtimeDetails.${index}.newJobSetup`} 
                    {...register(`downtimeDetails.${index}.newJobSetup`)} 
                    placeholder="Enter New Job set up" 
                    className="border p-2" 
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/6"> 
                  <label htmlFor={`downtimeDetails.${index}.leaves`} className="font-semibold">Leaves / Permission:</label>
                  <input 
                    id={`downtimeDetails.${index}.leaves`} 
                    {...register(`downtimeDetails.${index}.leaves`)} 
                    placeholder="Enter Leaves / Permission" 
                    className="border p-2" 
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/6"> 
                  <label htmlFor={`downtimeDetails.${index}.powerFailure`} className="font-semibold">Power failure:</label>
                  <input 
                    id={`downtimeDetails.${index}.powerFailure`} 
                    {...register(`downtimeDetails.${index}.powerFailure`)} 
                    placeholder="Enter Power failure" 
                    className="border p-2" 
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/6"> 
                  <label htmlFor={`downtimeDetails.${index}.machineBreakdown`} className="font-semibold">Machine breakdown:</label>
                  <input 
                    id={`downtimeDetails.${index}.machineBreakdown`} 
                    {...register(`downtimeDetails.${index}.machineBreakdown`)} 
                    placeholder="Enter Machine breakdown" 
                    className="border p-2" 
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/6"> 
                  <label htmlFor={`downtimeDetails.${index}.overTime`} className="font-semibold">Over Time:</label>
                  <input 
                    id={`downtimeDetails.${index}.overTime`} 
                    {...register(`downtimeDetails.${index}.overTime`)} 
                    placeholder="Enter Over Time" 
                    className="border p-2" 
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/6"> 
                  <label htmlFor={`downtimeDetails.${index}.others`} className="font-semibold">Others:</label>
                  <input 
                    id={`downtimeDetails.${index}.others`} 
                    {...register(`downtimeDetails.${index}.others`)} 
                    placeholder="Enter Others" 
                    className="border p-2" 
                  />
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={addDowntimeRow} className="mt-2 px-4 py-2 bg-persian-green-700 text-white rounded">Add Row</button>
        </div> */}

         {/* Downtime Details Button */}
         <button 
          type="button" 
          onClick={openDowntimePopup} 
          className="px-4 py-2 bg-persian-green-700 text-white rounded"
        >
          Show Downtime Details
        </button>

        {/* Footer */}
        <div className="mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex-1">
              <p className="mb-2">Remarks for down time details:</p>
              <textarea 
                name="remarks" 
                {...register('employeeFields.remarks')} 
                className="h-10 border-b border-persian-green-300 w-full"
              />
            </div>
            <div className="flex-1 flex flex-col md:flex-row justify-around"> {/* Changed to flex-col for mobile */}
              {/* <div className="text-center mb-4 md:mb-0"> 
                {signatureData && (
                  <div className="mt-4">
                    <p>{signatureData.name}</p>
                    {signatureData.file && <img src={signatureData.file} alt="Signature" className="h-16" />}
                  </div>
                )}
                <button 
                  type="button" 
                  onClick={() => setShowModal(true)} 
                  className="mb-2 px-4 py-2 bg-persian-green-200 rounded"
                >
                  Add Signature
                </button>
                <p>Signature of the Technician</p>
              </div> */}
              {/* <div className="text-center"> 
                {subEngrSignatureData && (
                  <div className="mt-4">
                    <p>{subEngrSignatureData.name}</p>
                    {subEngrSignatureData.file && <img src={subEngrSignatureData.file} alt="Sub/Engr Signature" className="h-16" />}
                  </div>
                )}
                <button 
                  type="button" 
                  onClick={() => setShowSubEngrModal(true)} 
                  className="mb-2 px-4 py-2 bg-persian-green-200 rounded"
                >
                  Add Signature
                </button>
                <p>Signature of the Sub/Engr:</p>
              </div> */}
            </div>
          </div>
        </div>

        {/* Modal for Signature Input */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-persian-green-500 bg-opacity-50 p-4">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-lg font-bold mb-4">Add Signature</h2>
              <input 
                type="text" 
                value={signature} 
                onChange={handleSignatureChange} 
                placeholder="Enter Name (optional)" 
                className="border p-1 mb-2 w-full"
              />
              <input 
                type="file" 
                onChange={handleSignatureUpload} 
                className="mb-2 w-full"
              />
              <div className="flex justify-end">
                <button 
                  type="button" 
                  onClick={handleOk} 
                  className="px-4 py-2 bg-persian-green-600 text-white rounded"
                >
                  OK
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="ml-2 px-4 py-2 bg-persian-green-200 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showSubEngrModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-persian-green-500 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-lg font-bold mb-4">Add Signature of the Sub/Engr</h2>
              <input 
                type="text" 
                value={subEngrSignature} 
                onChange={handleSubEngrSignatureChange} 
                placeholder="Enter Name (optional)" 
                className="border p-1 mb-2 w-full"
              />
              <input 
                type="file" 
                onChange={handleSubEngrSignatureUpload} 
                className="mb-2 w-full"
              />
              <div className="flex justify-end">
                <button 
                  type="button" 
                  onClick={handleSubEngrOk} 
                  className="px-4 py-2 bg-persian-green-600 text-white rounded"
                >
                  OK
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowSubEngrModal(false)} 
                  className="ml-2 px-4 py-2 bg-persian-green-200 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showDowntimePopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-persian-green-500 bg-opacity-50 p-4">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-lg font-bold mb-4">Downtime Details</h2>
              {Object.keys(downtimeToggles).map((key) => (
                <div key={key} className="flex items-center mb-2">
                  <input 
                    type="checkbox" 
                    checked={downtimeToggles[key]} 
                    onChange={() => toggleDowntimeField(key)} 
                    className="mr-2"
                  />
                  <label className="font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                  {downtimeToggles[key] && (
                    <input 
                      type="text" 
                      placeholder={`Enter ${key}`} 
                      value={downtimeInputs[key] || ''} // Set value from downtimeInputs state
                      className="border p-2 ml-2 w-full"
                      onChange={(e) => handleDowntimeInputChange(key, e.target.value)} // Update state on input change
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end mt-4">
                <button 
                  type="button" 
                  onClick={okDowntimePopup} 
                  className="px-4 py-2 bg-persian-green-600 text-white rounded mr-2"
                >
                  Ok
                </button>
                <button 
                  type="button" 
                  onClick={closeDowntimePopup} 
                  className="px-4 py-2 bg-persian-green-600 text-white rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}


        <div className="mt-4 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-persian-green-600">Document Code: FIE/028/0</p>
          <div className="space-x-0 md:space-x-4 flex flex-col md:flex-row">
            <button type="submit" className="px-6 py-2 bg-persian-green-600 text-white rounded">Complete</button>
            <button type="button" className="px-6 py-2 bg-persian-green-200 rounded">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobCard;