import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchProduct, setChatWith, addCart } from '../stores/action';

export default function ProductDetails({ socket }) {
  const { user_id, user_role } = useSelector(({ user_id, user_role }) => {
    return {
      user_id,
      user_role,
    };
  });
  const product = useSelector((state) => state.product);
  const isLoading = useSelector((state) => state.isLoading);

  const dispatch = useDispatch();
  const history = useHistory();

  const { id: productId } = useParams();

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, []);

  const addToCart = (e, id) => {
    e.preventDefault();
    dispatch(addCart(id));
  };

  const handleChat = () => {
    // dispatch(setChatWith(sellerId, sellerName))
    const sellerName = `${product?.UsersProducts[0]?.User?.firstName} ${product?.UsersProducts[0]?.User?.lastName}`;
    dispatch(
      setChatWith({ id: product?.UsersProducts[0]?.User?.id, name: sellerName })
    ); // get id and name from product.sellerId & product.sellerName
    socket.emit('joinRoom', {
      sellerId: product?.UsersProducts[0]?.User.id, //product.sellerId
      buyerId: user_id,
    });
    history.push('/chat'); // push ke chat doang
  };

  if (isLoading) {
    return <h1>Loading mas</h1>;
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="product"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={product?.picture}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            {product?.Brands?.map((el) => {
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
              {product?.name}
            </h1>
            <h2 className="text-sm title-font text-gray-500 tracking-widest mb-1">
              {product?.Category?.name}
            </h2>
            {product?.UsersProducts?.map((el, i) => {
              return (
                <h2
                  key={'seller-detail-' + i}
                  className="text-sm title-font text-gray-500 text-transform: uppercase; tracking-widest"
                >
                  By : {`${el.User.firstName} ${el.User.lastName}`}
                </h2>
              );
            })}
            {user_role === 'buyer' ? (
              <button
                className="bg-green-400 text-white px-4 py-1 rounded-lg my-2"
                onClick={handleChat}
              >chat with seller</button>
            ) : null}

            <p className="leading-relaxed mt-5">{product?.description}</p>
            <p className="leading-relaxed text-sm font-style: italic mt-5">
              Ingredients : {product?.ingridient?.join(', ')}.
            </p>
            <h1 className={`font-bold ${+product.status > 0 ? 'text-red-600' : 'text-green-600'}`}>This Product contains {product.status} harmful ingredients which {+product.status > 1 ? 'are': 'is'}: {product.harmfulIngridient.join(', ')} </h1>

            <div className="flex mt-10">
              <span className="title-font font-medium text-2xl text-gray-900">
                Rp {product?.price?.toLocaleString('id-ID')}, 00
              </span>
              <button
                onClick={(e) => addToCart(e, product.id)}
                className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
              >
                Add to Cart
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
