import React from 'react';
import { Link } from 'react-router-dom';

export default function MiniProduct({ products }) {
  return (
    <div className="p-4">
      <div className="bg-gray-100 hover:grow hover:shadow-md p-6 rounded-lg">
        <Link to={`/products/${products.id}`}>
          <img
            className="h-40 rounded w-full object-cover object-center mb-6"
            src={products.picture}
            alt="content"
          />
          <h3 className="tracking-widest text-green-500 text-xs font-medium title-font">
            {products.Brands[0].name.toUpperCase()}
          </h3>
          <h2 className="text-lg text-gray-900 font-medium title-font">
            {products.name}
          </h2>
          <p className="text-sm text-gray-900 font-style: italic; title-font mb-2">
            <i>{products.Category.name}</i>
          </p>
          <p className="text-md text-gray-900 title-font mb-4">
            {products.UsersProducts[0].User.firstName +
              products.UsersProducts[0].User.lastName}
          </p>
          <p className="leading-relaxed text-base mb-4">
            Rp {products.price.toLocaleString('id-ID')}, 00
          </p>
        </Link>
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
