import React, { useEffect } from 'react';
import MiniProduct from '../components/MiniProduct';
import { fetchProducts } from '../stores/action';
import { useDispatch, useSelector } from 'react-redux';
import Transition from '../components/Transition';

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (products.length === 0) {
    return <Transition />;
  } else {
    return (
      <>
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-24 mx-auto flex">
            <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden bg-blue-3 sm:mr-10 p-10 flex items-end justify-start relative" />
            <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto mt-8 md:mt-0">
              <img
                src="https://ik.imagekit.io/ztg2jcaeb0e/ecommerce/Yay__it_s_Black_Friday__pOwXx_u5YuT.png?updatedAt=1631838562403"
                alt=""
              />
            </div>
          </div>
        </section>

        {/* <!-- mini products --> */}
        <section className="text-gray-600 body-font sm:gap-5 lg:px-64 sm:py-18 md:px-48 sm:px-22 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {products.map((el) => {
            return (
              <MiniProduct className="sm:py-20" key={el.id} products={el} />
            );
          })}
        </section>
      </>
    );
  }
}
