import React, { useEffect } from 'react';
import MiniProduct from '../components/MiniProduct';
import { fetchProducts } from '../stores/action';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <section>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 my-24 mx-auto flex sm:flex-nowrap flex-wrap">
          <div 
          className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden bg-blue-3 sm:mr-10 p-10 flex items-end justify-start relative" 
          style={{backgroundImage: `url(https://ik.imagekit.io/ztg2jcaeb0e/ecommerce/Do_it_for_The_Future_A0A91nY3m.png?updatedAt=1631938363685)`}}
          >

          </div>
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
        <div className="flex justify-end mb-3 text-2xl">
          <Link to="/products">See more</Link>
        </div>
        <section className="text-gray-600 body-font grid grid-cols-4 gap-4">
          {products.map((el, i) => {
            console.log(el);
            if(i < 4){
              return <MiniProduct key={el.id} products={el} />;
            }
          })}
        </section>
      </div>
    </section>
  );
}
