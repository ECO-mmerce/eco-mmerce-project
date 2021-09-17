import React from 'react';
import Cart from '../components/Cart';
import OrderHistory from '../components/OrderHistory';

export default function UserDashboard() {
  return (
    <section className="px-10 flex flex-col items-center my-10">
      <Cart />
      <OrderHistory />
    </section>
  );
}
