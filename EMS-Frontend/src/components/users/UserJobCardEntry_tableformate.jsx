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
      jobDetails: {
        name: 'N V Reddy',
        ecNo: '248',
        cc: '230',
        shift: '1st',
        date: '31/07/24',
        remarks: '',
      },
      productionDetails: [
        { code: 'AC001', type: 'M/c Type A', fwo: 'FWO123', time: '2 hours', qty: '1' },
      ],
      downtimeDetails: [ // Added default values for downtime details
        { rework: 'content', cleaning: 'content', materialShortage: 'content', noLoad: 'content', activityWithoutCode: 'content', newJobSetup: 'content', leaves: 'content', powerFailure: 'content', machineBreakdown: 'content', overTime: 'content', others: 'content' },
      ],
    },
  });
  const { fields: productionFields, append: appendProduction } = useFieldArray({
    control,
    name: 'productionDetails',
  });
  const { fields: downtimeFields, append: appendDowntime } = useFieldArray({ // Added useFieldArray for downtime details
    control,
    name: 'downtimeDetails',
  });

  const addProductionRow = () => {
    appendProduction({ code: '', type: '', fwo: '', time: '', qty: '' }); // Function to add a new production row
  };

  const addDowntimeRow = () => { // Function to add a new downtime row
    appendDowntime({ rework: '', cleaning: '', materialShortage: '', noLoad: '', activityWithoutCode: '', newJobSetup: '', leaves: '', powerFailure: '', machineBreakdown: '', overTime: '', others: '' });
  };

  const onSubmit = (data) => {
    console.log(data); // Handle form submission
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
            {...register('jobDetails.date')} 
            value={currentDate} // Set value directly from state
            onChange={(e) => setCurrentDate(e.target.value)} // Update state on change
            className="text-sm w-full md:w-auto" // Responsive width
          />
          </div>
        </div>

        {/* Employee Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"> {/* Responsive grid layout */}
          <div className="flex gap-2 items-center"> {/* Added items-center for vertical alignment */}
            <span className="font-semibold">Name:</span>
            <input 
              type="text" 
              name="name" 
              {...register('jobDetails.name')} 
              className="w-full" // Full width input
            />
          </div>
          <div className="flex gap-2 items-center"> {/* Added items-center for vertical alignment */}
            <span className="font-semibold">EC No:</span>
            <input 
              type="text" 
              name="ecNo" 
              {...register('jobDetails.ecNo')} 
              className="w-full" // Full width input
            />
          </div>
          <div className="flex gap-2 items-center"> {/* Added items-center for vertical alignment */}
            <span className="font-semibold">CC:</span>
            <input 
              type="text" 
              name="cc" 
              {...register('jobDetails.cc')} 
              className="w-full" // Full width input
            />
          </div>
          <div className="flex gap-2 items-center"> {/* Added items-center for vertical alignment */}
            <span className="font-semibold">Shift:</span>
            <input 
              type="text" 
              name="shift" 
              {...register('jobDetails.shift')} 
              className="w-full" // Full width input
            />
          </div>
        </div>

        {/* Production Details */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3">Production Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-persian-green-50">
                  <th className="border p-2 text-left">Activity Code No</th>
                  <th className="border p-2 text-left">M/c Type</th>
                  <th className="border p-2 text-left">FWO No</th>
                  <th className="border p-2 text-left">Time Taken</th>
                  <th className="border p-2 text-left">Quantity</th>
                  <th className="border p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {productionFields.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border p-2">
                      <input {...register(`productionDetails.${index}.code`)} className="w-full" />
                    </td>
                    <td className="border p-2">
                      <input {...register(`productionDetails.${index}.type`)} className="w-full" />
                    </td>
                    <td className="border p-2">
                      <input {...register(`productionDetails.${index}.fwo`)} className="w-full" />
                    </td>
                    <td className="border p-2">
                      <input {...register(`productionDetails.${index}.time`)} className="w-full" />
                    </td>
                    <td className="border p-2">
                      <input {...register(`productionDetails.${index}.qty`)} className="w-full" />
                    </td>
                    <td className="border p-2">
                      <select {...register(`productionDetails.${index}.status`)} className="w-full p-1 border rounded">
                        <option>Dropdown</option>
                        <option>C - Completed</option>
                        <option>IC - Incomplete</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={addProductionRow} className="mt-2 px-4 py-2 bg-persian-green-700 text-white rounded">Add Row</button>
          </div>
        </div>

        {/* Down Time Details */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3">Down Time Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-persian-green-50">
                  <th className="border p-2 text-left">Rework</th>
                  <th className="border p-2 text-left">Cleaning / Workhead org</th>
                  <th className="border p-2 text-left">Material Shortage</th>
                  <th className="border p-2 text-left">No Load</th>
                  <th className="border p-2 text-left">Activity without code</th>
                  <th className="border p-2 text-left">New Job set up</th>
                  <th className="border p-2 text-left">Leaves / Permission</th>
                  <th className="border p-2 text-left">Power failure</th>
                  <th className="border p-2 text-left">Machine breakdown</th>
                  <th className="border p-2 text-left">Over Time</th>
                  <th className="border p-2 text-left">Others</th>
                </tr>
              </thead>
              <tbody>
                {downtimeFields.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border p-2">
                      <input {...register(`downtimeDetails.${index}.rework`)} className="w-full" />
                    </td>
                    <td className="border p-2">
                      <input {...register(`downtimeDetails.${index}.cleaning`)} className="w-full" />
                    </td>
                    <td className="border p-2">
                      <input {...register(`downtimeDetails.${index}.materialShortage`)} className="w-full" />
                    </td>
                    <td className="border p-2">
                      <input {...register(`downtimeDetails.${index}.noLoad`)} className="w-full" />
                    </td>
                    <td className="border p-2">
                      <input {...register(`downtimeDetails.${index}.activityWithoutCode`)} className="w-full" />
                    </td>
                    <td className="border p-2">
                      <input {...register(`downtimeDetails.${index}.newJobSetup`)} className="w-full" />
                    </td>
                    <td className="border p-2">
                      <input {...register(`downtimeDetails.${index}.leaves`)} className="w-full" />
                    </td>
                    <td className="border p-2">
                      <input {...register(`downtimeDetails.${index}.powerFailure`)} className="w-full" />
                    </td>
                    <td className="border p-2">
                      <input {...register(`downtimeDetails.${index}.machineBreakdown`)} className="w-full" />
                    </td>
                    <td className="border p-2">
                      <input {...register(`downtimeDetails.${index}.overTime`)} className="w-full" />
                    </td>
                    <td className="border p-2">
                      <input {...register(`downtimeDetails.${index}.others`)} className="w-full" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" onClick={addDowntimeRow} className="mt-2 px-4 py-2 bg-persian-green-700 text-white rounded">Add Row</button>
          </div>
        </div>

                      {/* Footer */}
      <div className="mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex-1">
            <p className="mb-2">Remarks for down time details:</p>
            <textarea 
              name="remarks" 
              {...register('jobDetails.remarks')} 
              className="h-10 border-b border-persian-green-300 w-full"
            />
          </div>
          <div className="flex-1 flex flex-col md:flex-row justify-around"> {/* Changed to flex-col for mobile */}
            <div className="text-center mb-4 md:mb-0"> {/* Added mb-4 for spacing on mobile */}
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
            </div>
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