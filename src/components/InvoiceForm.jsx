import React, { useState } from 'react';
import jsPDF from 'jspdf';

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    clientName: '',
    items: [],
    totalAmount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF();
    console.log(formData);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Invoice Form', 10, 10);
    doc.text(`Invoice Number: ${formData.invoiceNumber}`, 10, 20);
    doc.text(`Client Name: ${formData.clientName}`, 10, 30);
    const filename = `INV${formData.invoiceNumber}.pdf`;
    doc.save(filename); // Save PDF
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
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
  
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Create Invoice</button>
    </form>
  );
};

export default InvoiceForm;
