import React from 'react';
import { Link } from 'react-router-dom';
export default function ProductCard(props) {
  const {product} = props
  return (
    <Link to={`/products/${product.id}`} className=" p-4 bg-white rounded-lg ">
      <div className="block relative h-48 rounded overflow-hidden">
        <img
          alt="ecommerce"
          className="object-cover object-center w-full h-full block"
          src="https://dummyimage.com/420x260"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          CATEGORY
        </h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">
          The Catalyzer
        </h2>
        <p className="mt-1">$16.00</p>
      </div>
    </Link>
  );
}
