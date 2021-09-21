import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeQty, deleteCart } from '../stores/action';
import { addCart } from '../stores/action';

export default function CartItem({ data }) {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const getPriceForQty = (price, qty) => {
    let result = price * qty;

    return `Rp ${result.toLocaleString()}, 00`;
  };

  const deleteHandler = (id) => {
    setModal(false);
    dispatch(deleteCart(id));
  };

  return (
    <div className="my-3 flex justify-between items-center text-xl">
      <div className="flex items-center">
        <img className="h-20" src={data.Product.picture} alt="Item Image" />
        <tdata>{data.Product.name}</tdata>
      </div>
      <tdata>Rp {data.Product.price.toLocaleString()}, 00</tdata>
      <tdata>
        <button
          className="mr-2"
          onClick={() => dispatch(removeQty(data.Product.id))}
        >
          -
        </button>
        {data.Product.qty}
        <button
          className="ml-2"
          onClick={() => dispatch(addCart(data.Product.id))}
        >
          +
        </button>
      </tdata>
      <tdata>{getPriceForQty(data.Product.price, data.Product.qty)}</tdata>
      <button
        onClick={() => setModal(true)}
        className="bg-red-400 text-white px-3 py-1 rounded-lg"
      >
        delete
      </button>

      {modal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Delete Item ?</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <h3 className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Are you sure you want to delete this item form your cart ?
                  </h3>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => deleteHandler(data.Product.id)}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
