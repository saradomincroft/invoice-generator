import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SavePreview } from './SavePreview';

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    businessName: '',
    abn: '',
    selectedDate: new Date(),
    dueDate: new Date(),
    fullName: '',
    addressFields: [
      { label: 'Address Line 1', name: 'addressLine1', value: '' },
      { label: 'Address Line 2', name: 'addressLine2', value: '' },
      { label: 'City', name: 'city', value: '' },
      { label: 'State', name: 'state', value: '' },
      { label: 'Postcode', name: 'postcode', value: '' },
      { label: 'Country', name: 'country', value: '' },
    ],
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

  const handleAddressChange = (e, index) => {
    const { name, value } = e.target;
    const updatedAddressFields = [...formData.addressFields];
    updatedAddressFields[index].value = value;
    setFormData((prevData) => ({
      ...prevData,
      addressFields: updatedAddressFields,
    }));
  };

  const handleDateChange = (date, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: date,
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
    const formattedAddress = formData.addressFields.map((field) => `${field.label}: ${field.value}`).join('\n');
    SavePreview(formData, true, formData.logoFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedAddress = formData.addressFields.map((field) => `${field.label}: ${field.value}`).join('\n');
    SavePreview(formData, false, formData.logoFile);
    console.log(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      {/* Invoice Number */}
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

      {/* Business Name */}
      <div className="mb-4">
        <label htmlFor="businessName" className="block text-gray-700">Business Name</label>
        <input
          type="text"
          id="businessName"
          name="businessName"
          placeholder="Enter business name"
          value={formData.businessName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* ABN */}
      <div className="mb-4">
        <label htmlFor="abn" className="block text-gray-700">ABN</label>
        <input
          type="text"
          id="abn"
          name="abn"
          placeholder="Enter ABN"
          value={formData.abn}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Current Date */}
      <div className="mb-4 flex">
        <div className="w-1/2 pr-2">
          <label htmlFor="selectedDate" className="block text-gray-700">Invoice Date</label>
          <DatePicker
            id="selectedDate"
            name="selectedDate"
            selected={formData.selectedDate}
            onChange={(date) => handleDateChange(date, 'selectedDate')}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Due Date */}
        <div className="w-1/2 pl-2">
          <label htmlFor="dueDate" className="block text-gray-700">Due Date</label>
          <DatePicker
            id="dueDate"
            name="dueDate"
            selected={formData.dueDate}
            onChange={(date) => handleDateChange(date, 'dueDate')}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      
      {/* Business Name */}
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Address */}
      {formData.addressFields.map((field, index) => (
        <div key={index} className="mb-4">
          <label htmlFor={field.name} className="block text-gray-700">{field.label}</label>
          <input
            type="text"
            id={field.name}
            name={field.name}
            placeholder={`Enter ${field.label}`}
            value={field.value}
            onChange={(e) => handleAddressChange(e, index)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
      ))}

      {/* Add Logo Option */}
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

      

      <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handlePreview}>Preview</button>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-4">Save PDF</button>
    </form>
  );
};

export default InvoiceForm;
