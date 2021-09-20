import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerProduct } from '../stores/action';
import { Link, useParams } from 'react-router-dom';

export default function SellerProductDetail() {
  const dispatch = useDispatch();
  const sellerProduct = useSelector((state) => state.sellerProduct);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSellerProduct(id));
  }, []);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="product"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={sellerProduct?.picture}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            {sellerProduct?.Brands?.map((el) => {
              return (
                <h2
                  key={el.id}
                  className="text-sm title-font text-gray-500 text-transform: uppercase; tracking-widest"
                >
                  {el.name.toUpperCase()}
                </h2>
              );
            })}
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {sellerProduct?.name}
            </h1>
            <h2 className="text-sm title-font text-gray-500 tracking-widest mb-1">
              {sellerProduct?.Category?.name}
            </h2>
            {sellerProduct?.UsersProducts?.map((el, i) => {
              return (
                <h2
                  key={'seller-detail-' + i}
                  className="text-sm title-font text-gray-500 text-transform: uppercase; tracking-widest"
                >
                  By : {`${el.User.firstName} ${el.User.lastName}`}
                </h2>
              );
            })}

            <p className="leading-relaxed mt-5">{sellerProduct?.description}</p>
            <p className="leading-relaxed text-sm font-style: italic mt-5">
              Ingredients : {sellerProduct?.ingridient?.join(', ')}.
            </p>

            <div className="flex mt-10">
              <span className="title-font font-medium text-2xl text-gray-900">
                Rp {sellerProduct?.price?.toLocaleString('id-ID')}, 00
              </span>
              <Link
                to={`/seller/products/edit/${sellerProduct.id}`}
                className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
              >
                Edit Product
              </Link>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
