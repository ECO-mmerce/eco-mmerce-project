import React from 'react';
import { Link } from 'react-router-dom';
import MiniProduct from '../components/MiniProduct';

export default function Home() {
  return (
    <section>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 my-24 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden bg-blue-3 sm:mr-10 p-10 flex items-end justify-start relative" style={{backgroundImage:`url(https://ik.imagekit.io/ztg2jcaeb0e/ecommerce/Do_it_for_The_Future_A0A91nY3m.png?updatedAt=1631938363685)`}} ></div>
          <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full mt-8 md:mt-0">
            <img
              src="https://ik.imagekit.io/ztg2jcaeb0e/ecommerce/Yay__it_s_Black_Friday__pOwXx_u5YuT.png?updatedAt=1631838562403"
              alt=""
            />
          </div>
        </div>
      </section>

      {/* <!-- mini products --> */}
      <div className="flex flex-col px-64">
        <Link to="/products" className="text-2xl flex justify-end items-center mb-3">
        <h4 className="mr-2">see more</h4>
        <svg xmlns="http://www.w3.org/2000/svg" height="20" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
        </Link>
        <section className="text-gray-600 body-font grid grid-cols-4 gap-5">
          {[{id: 1}, {id: 2}, {id:3}, {id: 4}].map((el) => {
            return <MiniProduct key={el.id} product={el} />;
          })}
        </section>
      </div>
    </section>
  );
}
