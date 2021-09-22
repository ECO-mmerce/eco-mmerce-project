import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { fetchSellerProducts } from '../stores/action';
import ChatList from '../components/ChatList';
import SellerProductCard from '../components/SellerProductCard';

export default function SellerDashboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLogin, user_role, sellerProducts } = useSelector(
    ({ isLogin, user_role, sellerProducts }) => {
      return {
        isLogin,
        user_role,
        sellerProducts,
      };
    }
  );

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, []);

  useEffect(() => {
    if (user_role === 'buyer') {
      history.push('/');
    } else if (!isLogin) {
      history.push('/seller/login');
    }
  }, [isLogin, user_role, history]);

  return (
    <>
      <section className="flex flex-col items-center my-10 px-10">
        <div className="flex flex-col gap-5 mb-10 w-full">
          <h1 className="text-2xl" style={{ fontSize: 36 }}>
            CHATS
          </h1>
          <div>{user_role === 'seller' ? <ChatList /> : null}</div>
        </div>
        <div className="flex justify-between items-center w-full mb-5">
          <h1 style={{ fontSize: 36 }}>MY PRODUCTS</h1>
          <Link
            to={`/seller/addproduct`}
            className="text-white bg-green-500 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
          >
            Add Product
          </Link>
        </div>
        <section className="text-gray-600 body-font flex">
          {sellerProducts?.length === 0 ? (
            <h1 className="mx-auto">
              It's Empty ;) Come add your products by click the green button !
            </h1>
          ) : (
            <div className="container sm:py-18 mx-auto">
              <div className="sm:gap-5 lg:px-6 md:px-8 sm:px-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {sellerProducts?.map((product) => {
                  return (
                    <SellerProductCard key={product.id} products={product} />
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </section>
    </>
  );
}
