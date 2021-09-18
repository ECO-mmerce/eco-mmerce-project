import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ products }) {
  return (
    <div className=" p-4 bg-white hover:grow hover:shadow-md rounded-lg ">
      <Link
        to={`/products/${products.id}`}
        className="block relative h-48 rounded overflow-hidden"
      >
        <img
          alt="ecommerce"
          className="object-cover object-center w-full h-full block"
          src={products.picture}
        />
      </Link>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          {products.Category.name}
        </h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">
          {products.name}
        </h2>
        <p className="mt-1 mb-2">{products.price.toLocaleString('id-ID')}</p>
        <button
          type="button"
          className="bg-green-400 hover:bg-green-600 text-white font-bold p-2 w-32 rounded-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
