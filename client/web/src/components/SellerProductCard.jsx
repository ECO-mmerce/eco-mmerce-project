import React from 'react';
import { Link } from 'react-router-dom';

export default function SellerProductCard({ products }) {
  //   console.log(products.id);
  return (
    <div className="p-4 bg-white hover:grow hover:shadow-md rounded-lg ">
      <Link
        className="block relative h-48 rounded overflow-hidden"
        to={`/seller/products/${products?.id}`}
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
        <h2 className="text-gray-900 title-font text-l g font-medium">
          {products.name}
        </h2>
        <p className="mt-1 mb-2">
          Rp {products.price.toLocaleString('id-ID')} ,00
        </p>
      </div>
    </div>
  );
}
