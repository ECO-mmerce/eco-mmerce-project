import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../stores/action';
import Button from '@material-tailwind/react/Button';

export default function MiniProduct({ products }) {
  const dispatch = useDispatch();
  const user_role = useSelector((state) => state.user_role);

  const addToCart = (e, id) => {
    e.preventDefault();
    dispatch(addCart(id));
  };

  return (
    <div className="w-full h-full">
      <div className="bg-gray-100 hover:grow hover:shadow-md p-6 rounded-lg">
        <Link to={`/products/${products.id}`}>
          <img
            className="h-40 rounded-lg w-full object-cover object-center mb-6"
            src={products.picture}
            alt="content"
          />
          {products?.Brands?.map((el) => {
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
              <p
                key={el.ProductId}
                className="text-md text-gray-900 title-font mb-4"
              >
                {`${el.User.firstName} ${el.User.lastName}`}
              </p>
            );
          })}
          <p className="leading-relaxed text-base mb-4">
            IDR {products.price.toLocaleString('id-ID')}, 00
          </p>
        </Link>
        <div className="items-center w-full h-full">
          {localStorage.access_token && user_role === 'buyer' ? (
            <Button
              color="teal"
              onClick={(e) => addToCart(e, products.id)}
              ripple="light"
            >
              <svg
                className="mr-4 bi bi-cart3"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              Add to Cart
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
