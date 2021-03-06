import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../stores/action';
import Button from '@material-tailwind/react/Button';

export default function ProductCard({ products }) {
  const dispatch = useDispatch();
  const user_role = useSelector((state) => state.user_role);

  const addToCart = (e, id) => {
    e.preventDefault();
    dispatch(addCart(id));
  };

  return (
    <div className="p-4 bg-white hover:grow hover:shadow-md rounded-lg relative flex flex-col justify-between">
      <div>
        <Link
          to={`/products/${products.id}`}
          className="block relative h-48 rounded overflow-hidden"
        >
          <img
            alt="ecommerce"
            className="object-cover object-center rounded-lg w-full h-full block"
            src={products.picture}
          />
        </Link>
        <div className="mt-4 static">
          <h3 className="text-gray-500 flex flex-grow text-xs tracking-widest title-font mb-1">
            {products.Category.name}
          </h3>
          <h2 className="text-gray-900 flex flex-grow title-font text-lg font-medium">
            {products.name}
          </h2>
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
        </div>
      </div>
      <div className="mb-3 flex flex-col-reverse">
        {localStorage.access_token && user_role === 'buyer' ? (
          <Button
            className="h-full"
            color="teal"
            onClick={(e) => addToCart(e, products.id)}
            ripple="light"
          >
            <svg
              className="mr-4"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-cart3"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            Add to Cart
          </Button>
        ) : null}
        <p className="mt-1 flex flex-grow mb-2">
          IDR {products.price.toLocaleString('id-ID')}, 00
        </p>
      </div>
    </div>
  );
}
