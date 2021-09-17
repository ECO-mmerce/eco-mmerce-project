import React from 'react';
import ProductCard from '../components/ProductCard';

export default function Products() {
  return (
    <section className="text-gray-600 py-24 px-5 body-font flex h-screen overflow-y-scroll">
      <div className="h-full w-1/4 bg-white rounded-xl p-5 flex-col text-center justify-center items-center">
        Filter
      </div>
      <div className="container px-5  mx-auto">
        <div className="flex flex-wrap grid grid-cols-4 gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el) => {
            return <ProductCard key={el} />;
          })}
        </div>
      </div>
    </section>
  );
}
