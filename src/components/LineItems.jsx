import React from 'react';

function LineItems({ formData, calculateLineNumber, handleLineItemChange, handleRemoveItem, handleAddItem }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">Line Items</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-1 py-2" style={{ whiteSpace: 'nowrap' }}>Item No</th>
            <th className="px-4 py-2 text-right">Quantity</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Unit Price</th>
            <th className="px-4 py-2">GST</th>
            <th className="px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {formData.items.map((item, index) => (
            <tr key={index}>
                <td>
                    <input
                    type="text"
                    id={`lineNumber${index}`}
                    name={`lineNumber${index}`}
                    value={calculateLineNumber(index)}
                    className="w-16 px-1 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    readOnly
                    />
                </td>
                <td>
  <input
  
    type="number"
    id={`quantity${index}`}
    name={`quantity${index}`}
    value={item.quantity}
    onChange={(e) => handleLineItemChange(e, index)}
    className="w-16 px-2 py-2 border rounded-md focus:outline-none focus:border-blue-500"
  />
</td>
<td>
  <input
    type="text"
    name={`description${index}`}
    value={item.description}
    onChange={(e) => handleLineItemChange(e, index)}
    className="px-2 py-1 border rounded-md focus:outline-none focus:border-blue-500"
  />
</td>

              <td>
                <input
                  type="text"
                  name={`unitPrice${index}`}
                  value={item.unitPrice}
                  onChange={(e) => handleLineItemChange(e, index)}
                  className="px-2 py-1 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </td>
              <td>
                <select
                  name={`gst${index}`}
                  value={item.gst}
                  onChange={(e) => handleLineItemChange(e, index)}
                  className="px-2 py-1 border rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="Yes">10%</option>
                  <option value="No">0</option>
                </select>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500 focus:outline-none"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        onClick={handleAddItem}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2"
      >
        Add Line
      </button>
    </div>
  );
}

export default LineItems;
