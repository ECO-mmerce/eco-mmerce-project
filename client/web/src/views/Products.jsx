import React, { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../stores/action';
import { useDispatch, useSelector } from 'react-redux';

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <section className="text-gray-600 py-24 px-5 body-font flex h-screen overflow-y-scroll">
      <div className="h-full w-1/4 bg-white rounded-xl p-5 flex-col text-center justify-center items-center">
        Filter
      </div>
      <div className="container px-5  mx-auto">
        <div className="flex flex-wrap grid grid-cols-4 gap-5">
          {products.map((el) => {
            return <ProductCard key={el.id} products={el} />;
          })}
        </div>
      </div>
    </section>
  );
}
