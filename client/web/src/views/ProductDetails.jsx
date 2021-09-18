import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setChatWith } from '../stores/action';

export default function ProductDetails({ socket }) {
  const { user_id } = useSelector(({ user_id }) => {
    return {
      user_id,
    };
  });

  const dispatch = useDispatch();

  const history = useHistory();
  const handleChat = () => {
    // dispatch(setChatWith(sellerId, sellerName))
    dispatch(setChatWith({ id: 1, name: 'Ini nama seller' })); // get id and name from product.sellerId & product.sellerName
    socket.emit('joinRoom', {
      sellerId: 1, //product.sellerId
      buyerId: user_id,
    });
    history.push('/chat'); // push ke chat doang
  };

  const handleSeller = () => {
    dispatch(setChatWith({ id: 3, name: 'Ini nama buyer' })); // dapet dari hasil getAll chat
    socket.emit('joinRoom', {
      sellerId: user_id,
      buyerId: 3,
    });
    history.push('/chat');
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <button onClick={handleChat}>Go To Chat</button>
      <button onClick={handleSeller}>Go To Chat Seller</button>
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src="https://dummyimage.com/400x400"
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              BRAND NAME
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              The Catcher in the Rye
            </h1>

            <p className="leading-relaxed mt-5">
              Fam locavore kickstarter distillery. Mixtape chillwave tumeric
              sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
              juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
              seitan poutine tumeric. Gastropub blue bottle austin listicle
              pour-over, neutra jean shorts keytar banjo tattooed umami
              cardigan.
            </p>

            <div className="flex mt-10">
              <span className="title-font font-medium text-2xl text-gray-900">
                $58.00
              </span>
              <button className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">
                add to bag
              </button>
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
