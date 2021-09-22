import React, { useEffect } from 'react';
import Button from '@material-tailwind/react/Button';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ChatList from '../components/ChatList';
import SellerProductCard from '../components/SellerProductCard';

import { fetchSellerProducts } from '../stores/action';

export default function SellerDashboard({ socket }) {
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

  const toAddPage = () => {
    history.push('/seller/addproduct');
  };

  return (
<section className="text-gray-600 py-4 px-5 body-font flex h-full">
      <div className="h-full mr-6 w-1/4 bg-white rounded-xl p-5 pb-8 flex-col text-center justify-center overflow-y-scroll items-center">
        <h1 style={{ fontSize: 36 }} className="font-bold text-green-600">
          Chats
        </h1>
        <div className="grid grid-cols-1 w-full py-4 gap-5">
          {user_role === 'seller' ? <ChatList socket={socket} /> : null}
        </div>
      </div>

      <div className="container bg-white rounded-xl px-5 mx-auto">
        <div className="flex py-8 justify-center">
          <h1 style={{ fontSize: 36 }} className="font-bold text-green-600">
            My Products
          </h1>
        </div>

        <div className="flex pb-8 justify-center">
          <Button
            color="green"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            onClick={() => toAddPage()}
            ripple="light"
          >
            Add Product
          </Button>
        </div>

        <div className="flex flex-wrap grid grid-cols-4 gap-5">
          {sellerProducts.length === 0 ? (
            <h1 className="mx-auto">
              It's Empty ;) Come add your products by click the green button !
            </h1>
          ) : (
            sellerProducts.map((el) => {
              return <SellerProductCard key={el.id} products={el} />;
            })
          )}
        </div>
      </div>
    </section>
  );
}
