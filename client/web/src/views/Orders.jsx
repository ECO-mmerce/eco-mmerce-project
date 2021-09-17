import React from 'react';

export default function Orders() {
  return (
    <section className="px-10 flex flex-col items-center">
      <div className="flex flex-col items-start w-10/12 bg-green-400 rounded-xl">
        <h1 className="text-5xl font-bold my-5 px-5 text-white">Orders</h1>
        <div className="w-full bg-white p-7 rounded-xl">
          <div className="my-3 flex justify-between items-center text-xl">
            <div className="flex flex-col items-center">
              <t>product 1 x3</t>
              <t>product 2 x2</t>
              <t>product 2 x1</t>
            </div>
            <t>total: Rp 5.000.000</t>
            <form>
              <select>
                <option>Paid</option>
                <option>Shipping</option>
                <option>Shipped</option>
              </select>
              <button
                type="submit"
                className="bg-blue-400 text-white px-3 py-1 rounded-lg"
              >
                Update
              </button>
            </form>
          </div>
        </div>
        <table className="flex">
          <tbody>
            <tr></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
