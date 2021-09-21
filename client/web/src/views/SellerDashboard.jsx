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

  console.log(sellerProducts, `INI SELLER PUNYA`);

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
      <section className="px-10 flex flex-col items-center my-10">
        <h1 style={{ fontSize: 36 }}>MY PRODUCTS</h1>
        <Link
          to={`/seller/addproduct`}
          className="mx-auto mt-6 text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
        >
          Add Product
        </Link>
        <div>{user_role === 'seller' ? <ChatList /> : null}</div>
      </section>

      <section className="text-gray-600 py-24 px-5 body-font flex h-screen overflow-y-scroll">
        {sellerProducts?.length === 0 ? (
          <h1 className="mx-auto">
            It's Empty ;) Come add your products by clicking the green button !
          </h1>
        ) : (
          <div className="container px-5  mx-auto">
            <div className="flex flex-wrap grid grid-cols-4 gap-5">
              {sellerProducts?.map((product) => {
                return (
                  <SellerProductCard key={product.id} products={product} />
                );
              })}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
