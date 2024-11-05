// src/components/users/UserJobCardEntry.jsx
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form'; // Importing react-hook-form
import buhler from '../../assets/buhler.png';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useUser } from '../UserContext'; // Import the UserContext
import Select from 'react-select';

const JobCard = () => {
  const { user, setUser } = useUser();
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
  const [downtimeDetails, setDowntimeDetails] = useState([]); // State to hold downtime details for each production card
  const [selectedShift, setSelectedShift] = useState("Select Shift");
  const [activityCode, setActivityCode] = useState(""); // State for Activity Code
  const [machineType, setMachineType] = useState(""); // State for Machine Type
  const [fwoNumber, setFwoNumber] = useState(""); // State for FWO Number
  const [activityCodes, setActivityCodes] = useState([{ id: 1 }]);
  const [machineTypes, setMachineTypes] = useState([{ id: 1 }]);
  const [fwoNumbers, setFwoNumbers] = useState([{ id: 1 }]);
  const [timeEntries, setTimeEntries] = useState([{ id: 1, time: '' }]);
  const [quantityEntries, setQuantityEntries] = useState([{ id: 1, quantity: '' }]);
  const [statusEntries, setStatusEntries] = useState([{ id: 1 }]);
  const [currentProductionIndex, setCurrentProductionIndex] = useState(null); // Track the current production index for downtime details

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
        { name: '', ecNo: '', cc: '', shift: '' }, // Added default values for employee details
      ],
      productionDetails: [
        { code: '', type: '', fwo: '', time: '', qty: '', additionalInputs: { code: [], type: [], fwo: [] } },
      ],
      downtimeDetails: [ // Added default values for downtime details
        { rework: '', cleaning: '', materialShortage: '', noLoad: '', activityWithoutCode: '', newJobSetup: '', leaves: '', powerFailure: '', machineBreakdown: '', overTime: '', others: '' },
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
    appendProduction({ code: '', type: '', fwo: '', time: '', qty: '', additionalInputs: { code: [], type: [], fwo: [] } }); // Function to add a new production row
    resetDowntimeInputs(); // Reset downtime inputs and toggles when adding a new production row
  };

  const resetDowntimeInputs = () => {
    setDowntimeInputs({}); // Reset downtime inputs
    setDowntimeToggles({ // Reset downtime toggles
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

  const openDowntimePopup = (index) => {
    setCurrentProductionIndex(index); // Set the current production index
    setShowDowntimePopup(true); // Open the downtime popup
  };
  
  const handleDowntimeInputChange = (key, value) => {
    setDowntimeInputs(prev => ({ ...prev, [key]: value })); // Update downtime input values
  };
  
  const okDowntimePopup = () => {
    // Logic to handle OK button click
    const currentDowntimeDetails = Object.keys(downtimeToggles).reduce((acc, key) => {
      if (downtimeToggles[key]) {
        acc.push({ reason: key, value: downtimeInputs[key] || '' });
      }
      return acc;
    }, []);
    
    // Update the specific production detail's downtime details
    const updatedDowntimeDetails = [...downtimeDetails];
    updatedDowntimeDetails[currentProductionIndex] = currentDowntimeDetails;
    setDowntimeDetails(updatedDowntimeDetails); // Store downtime details
    closeDowntimePopup(); // Close the popup
  };

  const closeDowntimePopup = () => {
    setShowDowntimePopup(false); // Close the downtime popup
  };

  // Function to add additional input fields for production details
  const addAdditionalInput = (index, field) => {
    const updatedProductionDetails = [...productionFields];
    updatedProductionDetails[index].additionalInputs[field].push(''); // Add a new input to the specific field type
    appendProduction(updatedProductionDetails); // Update the production details state
  };

  const addActivityCodeField = (index) => {
    const updatedInputs = { ...productionFields[index].additionalInputs };
    updatedInputs.code.push('');
    appendProduction(productionFields.map((field, i) => 
      i === index ? { ...field, additionalInputs: updatedInputs } : field
    ));
  };
   // Sample options for dropdowns
   const activityOptions = [
    { value: 'AC001', label: 'Activity Code 001' },
    { value: 'AC002', label: 'Activity Code 002' },
    { value: 'AC003', label: 'Activity Code 003' },
  ];

  const machineOptions = [
    { value: 'MT001', label: 'Machine Type 001' },
    { value: 'MT002', label: 'Machine Type 002' },
    { value: 'MT003', label: 'Machine Type 003' },
  ];

  const fwoOptions = [
    { value: 'FWO001', label: 'FWO Number 001' },
    { value: 'FWO002', label: 'FWO Number 002' },
    { value: 'FWO003', label: 'FWO Number 003' },
  ];

  const statusOptions = [
    { value: 'completed', label: 'Completed' },
    { value: 'incomplete', label: 'Incomplete' },
  ];

  const addNewItem = (items, setItems) => {
    setItems([...items, { id: items.length + 1 }]);
  };

  const removeItem = (id, items, setItems) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  // const renderDropdownSection = (title, items, setItems, options) => (
  //   <div className="mb-6">
  //     <div className="font-semibold text-gray-700 mb-2">{title}</div>
  //     {items.map((item) => (
  //       <div key={item.id} className="flex items-center space-x-4 mb-2">
  //         <select 
  //           className="flex-1 p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  //           defaultValue=""
  //         >
  //           <option value="" disabled>Select {title}</option>
  //           {options.map(option => (
  //             <option key={option.value} value={option.value}>
  //               {option.label}
  //             </option>
  //           ))}
  //         </select>
          
  //         <div className="flex space-x-2">
  //           {items.length > 1 && (
  //             <button
  //               onClick={() => removeItem(item.id, items, setItems)}
  //               className="p-2 text-red-500 hover:text-red-700 transition-colors"
  //             >
  //               {/* <Trash2 size={20} /> */}
  //             </button>
  //           )}
  //         </div>
  //       </div>
  //     ))} 
  //   </div>
  // );

  const renderDropdownSection = (title, items, setItems, options) => (
    <div className="mb-6">
      <div className="font-semibold text-gray-700 mb-2">{title}</div>
      {items.map((item) => (
        <div key={item.id} className="flex items-center space-x-4 mb-2">
          <Select
            options={options}
            onChange={(selectedOption) => {
              const updatedItems = items.map(i => 
                i.id === item.id ? { ...i, selected: selectedOption } : i
              );
              setItems(updatedItems);
            }}
            isSearchable // Enable search functionality
            placeholder={`Select ${title}`}
            className="flex-1"
          />
          <div className="flex space-x-2">
            {items.length > 1 && (
              <button
                onClick={() => removeItem(item.id, items, setItems)}
                className="p-2 text-red-500 hover:text-red-700 transition-colors"
              >
                {/* <Trash2 size={20} /> */}
              </button>
            )}
          </div>
        </div>
      ))} 
    </div>
  );
  
  const renderInputSection = (title, items, setItems, type = "text", placeholder = "") => (
    <div className="mb-6">
      <div className="font-semibold text-gray-700 mb-2">{title}</div>
      {items.map((item) => (
        <div key={item.id} className="flex items-center space-x-4 mb-2">
          <input 
            type={type}
            placeholder={placeholder}
            className="flex-1 p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <div className="flex space-x-2">
            {items.length > 1 && (
              <button
                onClick={() => removeItem(item.id, items, setItems)}
                className="p-2 text-red-500 hover:text-red-700 transition-colors"
              >
                {/* <Trash2 size={20} /> */}
              </button>
            )}
          </div>
        </div>
      ))} 
    </div>
  );

  return (
    <div className="max-w-full mx-auto p-6 bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="flex flex-col md:flex-row items-center justify-center mb-4">
              <h1 className="text-xl md:text-3xl font-bold text-center text-persian-green-950">Job Card for Technicians</h1>
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
                      value={user.username} // Display the user's username
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
                    />
                  </label>
                </div>
                <div className="flex flex-col w-full md:w-1/4 mb-4">
                  <label htmlFor={`employeeDetails.${index}.cc`} className="font-semibold">CC : &nbsp;&nbsp;
                    <input 
                      id={`employeeDetails.${index}.cc`}
                      {...register(`employeeDetails.${index}.cc`)} 
                      placeholder="Enter CC" 
                      className="border p-2" 
                    />
                  </label>
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
                      <option value="Select Shift" disabled>Select Shift</option>
                      <option value="Morning">1st</option>
                      <option value="Afternoon">2nd</option>
                      <option value="Night">3rd</option>
                    </select>
                  </label>
                </div>
              </div>
            ))} 
          </div>
        </div>

        {/* Production Details Cards */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3">Production Details</h3>
          {productionFields.map((item, index) => (
            <div key={item.id} className="p-4 border rounded-lg shadow-md mb-4 bg-gray-50">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                
                
                <div className="flex flex-col w-full md:w-1/5 mb-4">
                  {renderDropdownSection('Activity Code No:', activityCodes, setActivityCodes, activityOptions)}
                </div>

                <div className="flex flex-col w-full md:w-1/5 mb-4">
                  {renderDropdownSection('M/c Type:', machineTypes, setMachineTypes, machineOptions)}
                </div>

                <div className="flex flex-col w-full md:w-1/5 mb-4">
                  {renderDropdownSection('FWO No:', fwoNumbers, setFwoNumbers, fwoOptions)}
                </div>
                
                <div className="flex flex-col w-full md:w-1/5 mb-4">
                  {renderInputSection('Time Taken:', timeEntries, setTimeEntries, "number", "Enter time in minutes")}
                </div>

                <div className="flex flex-col w-full md:w-1/5 mb-4">
                  {renderInputSection('Quantity:', quantityEntries, setQuantityEntries, "number", "Enter quantity")}
                </div>
                
                <div className="flex flex-col w-full md:w-1/5 mb-4">
                  {renderDropdownSection('Status:', statusEntries, setStatusEntries, statusOptions)}
                </div>

                {/* Downtime Details Button */}
                <button 
                  type="button" 
                  onClick={() => openDowntimePopup(index)} // Pass the index to openDowntimePopup
                  className="px-4 py-2 bg-persian-green-700 text-white rounded mt-4 "
                >
                  Show Downtime Details
                </button>

                {/* Display Downtime Details for the specific production card */}
                {downtimeDetails[index] && downtimeDetails[index].length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold">Downtime Details:</h4>
                    {downtimeDetails[index].map((detail, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{detail.reason}</span>
                        <span>{detail.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Button to add a new production detail card */}
          <button 
            type="button" 
            onClick={addProductionRow} 
            className="mt-4 px-4 py-2 bg-persian-green-700 text-white rounded"
          >
            Add Production Detail
          </button>
        </div>

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
          <div className="space-x-0 md:space-x-4 flex flex-col md:flex-row">
            <button type="submit" className="px-6 py-2 bg-persian-green-600 text-white rounded mb-3">Complete</button>
            <button type="button" className="px-6 py-2 bg-persian-green-200 rounded">Cancel</button>
            {/* <p className="text-sm text-persian-green-600">Document Code: FIE/028/0</p> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobCard;