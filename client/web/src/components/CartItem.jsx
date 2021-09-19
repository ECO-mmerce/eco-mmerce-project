import React from 'react';
import { useDispatch } from 'react-redux';
import { removeQty } from '../stores/action';
import { addCart } from '../stores/action';

export default function CartItem({ data }) {
  const dispatch = useDispatch();

  const getPriceForQty = (price, qty) => {
    let result = price * qty;

    return `Rp ${result.toLocaleString()}, 00`;
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
        onClick={() => dispatch(removeQty(data.Product.id))}
        className="bg-red-400 text-white px-3 py-1 rounded-lg"
      >
        delete
      </button>
    </div>
  );
}
