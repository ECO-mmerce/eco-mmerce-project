import React from 'react';
import ProductCard from '../components/ProductCard';

export default function Products() {
  return (
    <section className="text-gray-600 py-24 px-5 body-font flex">
      <div className="h-screen w-1/4 bg-white rounded-xl p-5 flex-col text-center justify-center items-center">
        Filter
      </div>
      <div className="container px-5  mx-auto">
        <div className="flex flex-wrap grid grid-cols-4 gap-5">
          {[{id:1}, {id:2}, {id:3}, {id:4}, {id:5}, {id:6}, {id:7}, {id:8}, {id:9}].map((el) => {
            return <ProductCard key={el.id} product={el} />;
          })}
        </div>
      </div>
    </section>
  );
}
