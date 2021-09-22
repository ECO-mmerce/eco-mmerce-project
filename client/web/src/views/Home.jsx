import React, { useEffect } from 'react';
import MiniProduct from '../components/MiniProduct';
import { fetchProducts } from '../stores/action';
import { useDispatch, useSelector } from 'react-redux';
import Transition from '../components/Transition';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  console.log(products);
  if (products.length === 0) {
    return <Transition />;
  } else {
    return (
      <>
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-24 mx-auto flex">
            <div 
            className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden bg-blue-3 sm:mr-10 p-10 flex items-end justify-start relative" 
            style={{backgroundImage: 'url(https://ik.imagekit.io/ztg2jcaeb0e/ecommerce/Do_it_for_The_Future_A0A91nY3m.png?updatedAt=1631938363685)'}}
            />
            <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto mt-8 md:mt-0">
              <img
                src="https://ik.imagekit.io/ztg2jcaeb0e/ecommerce/Yay__it_s_Black_Friday__pOwXx_u5YuT.png?updatedAt=1631838562403"
                alt=""
              />
            </div>
          </div>
        </section>

        {/* <!-- mini products --> */}
        <div className="flex flex-col items-center mx-10">
          <section className="text-gray-600 body-font sm:gap-5 sm:pt-18 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-screen/4">
            <Link to="/products" className="lg:col-span-4 md:col-span-2 sm:col-span-1 text-2xl font-bold text-green-900 flex flex-row-reverse items-center">
              <svg xmlns="http://www.w3.org/2000/svg" height="40" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
              </svg>
              See More
            </Link >
            { products.map((el,i) => {
              if(i < 4) {
                return (
                  <ProductCard key={el.id} products={el} />
                );
              }
            })}
          </section>          
        </div>
      </>
    );
  }
}
