import React from 'react';

export default function CartItem() {
  return (
    <div className="my-3 flex justify-between items-center text-xl">
      <div className="flex items-center">
        <img
          className="h-20"
          src="https://ik.imagekit.io/ztg2jcaeb0e/ecommerce/eco-merce_1__BX5HSOkuz.png?updatedAt=1631834431042"
          alt=""
        />
        <td>This is the product's name</td>
      </div>
      <td>Rp 500.000</td>
      <td>x 2</td>
      <td>Rp 1.000.000</td>
      <button className="bg-red-400 text-white px-3 py-1 rounded-lg">
        delete
      </button>
    </div>
  );
}
