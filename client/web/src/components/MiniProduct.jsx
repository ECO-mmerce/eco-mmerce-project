import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCart } from '../stores/action';

export default function MiniProduct({ products }) {
  const dispatch = useDispatch();

  const addToCart = (e, id) => {
    e.preventDefault();
    dispatch(addCart(id));
  };

  return (
    <div className="">
      <div className="bg-gray-100 hover:grow hover:shadow-md p-6 rounded-lg">
        <Link to={`/products/${products.id}`}>
          <img
            className="h-40 rounded w-full object-cover object-center mb-6"
            src={products.picture}
            alt="content"
          />
          {products?.Brands.map((el) => {
            return (
              <h3
                key={el.id}
                className="tracking-widest text-green-500 text-xs font-medium title-font"
              >
                {el.name}
              </h3>
            );
          })}
          <h2 className="text-lg text-gray-900 font-medium title-font">
            {products.name}
          </h2>
          <p className="text-sm text-gray-900 font-style: italic; title-font mb-2">
            <i>{products.Category.name}</i>
          </p>
          {products?.UsersProducts?.map((el) => {
            return (
              <p key={el.id} className="text-md text-gray-900 title-font mb-4">
                {`${el.User.firstName} ${el.User.lastName}`}
              </p>
            );
          })}
          <p className="leading-relaxed text-base mb-4">
            Rp {products.price.toLocaleString('id-ID')}, 00
          </p>
        </Link>
        {localStorage.access_token ? (
          <button
            type="button"
            onClick={(e) => addToCart(e, products.id)}
            className="bg-green-400 hover:bg-green-600 text-white font-bold p-2 w-32 rounded-lg"
          >
            Add to Cart
          </button>
        ) : (
          <Link
            // onClick={(e) => addToCart(e, products.id)}
            to="/login"
            className="bg-green-400 hover:bg-green-600 text-white font-bold p-2 w-32 rounded-lg"
          >
            Add to Cart
          </Link>
        )}
      </div>
    </div>
  );
}
