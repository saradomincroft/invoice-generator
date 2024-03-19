import React from 'react';

function InputAddress({ formData, handleAddressChange }) {
  return formData.addressFields.map((field, index) => (
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
  ));
}

export default InputAddress;
