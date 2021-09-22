import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchProduct, setChatWith, addCart } from '../stores/action';
import SocketContext from '../config/socket';
import Button from '@material-tailwind/react/Button';
import Alert from '@material-tailwind/react/Alert';

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

  console.log(product);

  const handleChat = () => {
    // dispatch(setChatWith(sellerId, sellerName))
    const sellerName = `${product?.UsersProducts[0]?.User?.firstName} ${product?.UsersProducts[0]?.User?.lastName}`;
    dispatch(
      setChatWith({
        id: product?.UsersProducts[0]?.User?.id,
        name: sellerName,
        picture: product?.UsersProducts[0]?.User?.picture,
      })
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
        <div className="lg:w-4/5 mx-auto flex">
          <img
            alt="product"
            className="lg:w-1/2 w-1/2 h-1/2 object-cover object-center rounded"
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
              <div className="pt-4">
                <Button
                  color="teal"
                  onClick={() => handleChat()}
                  ripple="light"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    fill="currentColor"
                    class="bi bi-chat-left-dots-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                  </svg>
                  Chat
                </Button>
              </div>
            ) : null}

            <p className="leading-relaxed mt-5">{product?.description}</p>
            <p className="leading-relaxed text-sm font-style: italic mt-5">
              Ingredients : {product?.ingridient?.join(', ')}.
            </p>
            <p className="leading-relaxed text-sm font-style: italic">
              Stock : {product?.stock}
            </p>
            <p className="leading-relaxed text-sm font-style: italic mb-5">
              Weight : {product?.weight} kg
            </p>

            {product?.status === 'Eco' ? (
              <Alert buttonText="test" color="green">
                <b>ECO!</b> This Product is Eco Friendly !
              </Alert>
            ) : product?.status === 'Warn' ? (
              <Alert buttonText="test" color="orange">
                <b>WARN!</b> This Product Contain{' '}
                {product?.harmfulIngridient?.includes('')
                  ? ''
                  : product?.harmfulIngridient?.length}{' '}
                non-Eco friendly ingrident, which is "
                {product.harmfulIngridient.join(', ')}".
              </Alert>
            ) : (
              <Alert buttonText="test" color="red">
                <b>HARMFUL!</b> This Product is HARMFUL for our environment. It
                contains {product?.harmfulIngridient?.length} non-Eco friendly
                ingridents, which is "{product?.harmfulIngridient?.join(', ')}".
              </Alert>
            )}

            <div className="flex mt-10">
              <span className="title-font font-medium text-2xl text-gray-900">
                Rp {product?.price?.toLocaleString('id-ID')}, 00
              </span>
              <div className="flex ml-auto">
                {localStorage.access_token && user_role === 'buyer' ? (
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
