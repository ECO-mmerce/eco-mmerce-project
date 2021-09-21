import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, checkOutCart } from '../stores/action';
import { toast } from 'react-toastify';
import CartItem from './CartItem';

const toastOptions = {
  position: 'bottom-right',
  theme: 'light',
};

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const getTotalPrice = (products) => {
    let prices = products.map((price) => {
      return price.Product.price * price.Product.qty;
    });

    let totalPrice = prices.reduce((acc, mov) => acc + mov, 0);

    return `Rp ${totalPrice.toLocaleString('id-ID')}, 00`;
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  console.log(cart, `INI CART`);

  const checkOut = () => {
    if (cart.length === 0) {
      toast.error('You have an empty cart', toastOptions);
    } else {
      dispatch(checkOutCart()).then((returnedValue) => {
        window.snap.pay(returnedValue.token);
      });
    }
  };

  return (
    <div className="flex flex-col mx-auto mt-20 items-start w-10/12 bg-green-400 rounded-xl mb-10">
      <h1 className="text-5xl font-bold my-5 px-5 text-white">My Cart</h1>
      <div className="w-full bg-white p-7 rounded-xl">
        {cart.length !== 0 ? (
          cart.map((el) => {
            return <CartItem key={el.Product.id} data={el} />;
          })
        ) : (
          <h1>It's empty, go shopping now EcoHippies !</h1>
        )}

        <div className="w-full h-1 bg-gray-600 rounded-xl my-5"></div>
        <div className="flex flex-col items-end gap-3">
          <h3 className="text-2xl font-semibold">
            total: {getTotalPrice(cart)}
          </h3>
          <button
            onClick={() => checkOut()}
            className="text-2xl bg-green-400 px-3 py-1 rounded-lg text-white"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
