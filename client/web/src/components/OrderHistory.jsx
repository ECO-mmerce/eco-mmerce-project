import React from 'react';
import OrderHistoryItem from './OrderHistoryItem';

export default function OrderHistory() {
  return (
    <div className="flex flex-col items-start w-10/12 bg-green-400 rounded-xl">
      <h1 className="text-5xl font-bold my-5 px-5 text-white">
        My Order History
      </h1>
      <div className="w-full bg-white p-7 rounded-xl">
        {[1, 2, 3].map((el) => {
          return <OrderHistoryItem key={el} />;
        })}
      </div>
      <table className="flex">
        <tr></tr>
      </table>
    </div>
  );
}
