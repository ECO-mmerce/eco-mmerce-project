import React from 'react';

export default function OrderHistoryItem() {
  return (
    <div className="my-3 flex justify-between items-center text-xl">
      <div className="flex items-center">
        <td>This is the product's summary</td>
      </div>
      <td>Rp 5.000.000</td>
      <td>status</td>
      <div>
        <button className="bg-red-400 text-white px-3 py-1 rounded-lg">
          cancel
        </button>
        <button className="bg-blue-400 text-white px-3 py-1 rounded-lg">
          complaint
        </button>
        <button className="bg-green-400 text-white px-3 py-1 rounded-lg">
          re-order
        </button>
      </div>
    </div>
  );
}
