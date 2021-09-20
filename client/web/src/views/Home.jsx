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
  }

  return (
    <section>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden bg-blue-3 sm:mr-10 p-10 flex items-end justify-start relative"></div>
          <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full mt-8 md:mt-0">
            <img
              src="https://ik.imagekit.io/ztg2jcaeb0e/ecommerce/Yay__it_s_Black_Friday__pOwXx_u5YuT.png?updatedAt=1631838562403"
              alt=""
            />
          </div>
        </div>
      </section>

      {/* <!-- mini products --> */}
      <section className="text-gray-600 body-font px-64 grid grid-cols-4">
        {products.map((el) => {
          console.log(el);
          return <MiniProduct key={el.id} products={el} />;
        })}
      </section>
    </section>
  );
}
