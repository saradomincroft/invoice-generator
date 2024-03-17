import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SavePreview } from './SavePreview';

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    selectedDate: new Date(),
    invoiceNumber: '',
    clientName: '',
    items: [],
    logoFile: null,
    totalAmount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedDate: date,
    }));
  };
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      logoFile: file,
    }));
  };
  const handlePreview = () => {
    SavePreview(formData, true, formData.logoFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    SavePreview(formData, false, formData.logoFile);
    console.log(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="selectedDate" className="block text-gray-700">Invoice Date</label>
        <DatePicker
          id="selectedDate"
          name="selectedDate"
          selected={formData.selectedDate}
          onChange={handleDateChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="invoiceNumber" className="block text-gray-700">Invoice Number</label>
        <input
          type="text"
          id="invoiceNumber"
          name="invoiceNumber"
          placeholder="Enter invoice number"
          value={formData.invoiceNumber}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="clientName" className="block text-gray-700">Client Name</label>
        <input
          type="text"
          id="clientName"
          name="clientName"
          placeholder="Enter client name"
          value={formData.clientName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="logo" className="block text-gray-700">Add Logo</label>
        <input
          type="file"
          id="logo"
          name="logo"
          accept=".png, .jpg, .jpeg"
          onChange={handleLogoUpload}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handlePreview}>Preview PDF</button>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Create Invoice</button>
    </form>
  );
};

export default InvoiceForm;
