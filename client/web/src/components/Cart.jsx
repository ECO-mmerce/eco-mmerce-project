import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, checkOutCart } from '../stores/action';
import { toast } from 'react-toastify';
import CartItem from './CartItem';
import Button from '@material-tailwind/react/Button';
import H6 from '@material-tailwind/react/Heading6';

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

    return `IDR ${totalPrice.toLocaleString('id-ID')}, 00`;
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

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
    <div className="h-screen">
      <div className="flex flex-col mx-auto mt-20 items-start w-10/12 bg-green-400 rounded-xl mb-10">
        <h1 className="text-5xl font-bold my-5 px-5 text-white">My Cart</h1>
        <div className="w-full bg-white p-7 rounded-xl">
          <div>
            {cart.length !== 0 ? (
              cart.map((el) => {
                return <CartItem key={el.Product.id} data={el} />;
              })
            ) : (
              <H6 color="gray">It's empty, go shopping now, EcoHippies !</H6>
            )}
          </div>

          <div className="w-full h-1 bg-gray-600 rounded-xl my-5"></div>
          <div className="flex flex-col items-end gap-3">
            <H6 color="gray" className="text-2xl font-semibold">
              Total Price : {getTotalPrice(cart)}
            </H6>

            <Button color="teal" onClick={() => checkOut()} ripple="light">
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
