import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchProduct, setChatWith, addCart } from '../stores/action';
import SocketContext from '../config/socket';
import Button from '@material-tailwind/react/Button';

export default function ProductDetails() {
  const { user_id, user_role } = useSelector(({ user_id, user_role }) => {
    return {
      user_id,
      user_role,
    };
  });
  const product = useSelector((state) => state.product);
  const isLoading = useSelector((state) => state.isLoading);

  const socket = React.useContext(SocketContext);
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
              <div className="flex ml-auto">
                {localStorage.access_token ? (
                  <Button
                    color="teal"
                    onClick={(e) => addToCart(e, product.id)}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
