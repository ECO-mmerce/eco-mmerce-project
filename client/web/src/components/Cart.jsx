import React from 'react';
import CartItem from './CartItem';

export default function Cart() {
  return (
    <div className="flex flex-col items-start w-10/12 bg-green-400 rounded-xl mb-10">
      <h1 className="text-5xl font-bold my-5 px-5 text-white">My Cart</h1>
      <div className="w-full bg-white p-7 rounded-xl">
        {[1, 2, 3].map((el) => {
          return <CartItem key={el} />;
        })}

        <div className="w-full h-1 bg-gray-600 rounded-xl my-5"></div>
        <div className="flex flex-col items-end gap-3">
          <h3 className="text-2xl font-semibold">total: Rp. 3000.000.000</h3>
          <button className="text-2xl bg-green-400 px-3 py-1 rounded-lg text-white">
            Checkout
          </button>
        </div>
      </div>
      <table className="flex">
        <tr></tr>
      </table>
    </div>
  );
}
