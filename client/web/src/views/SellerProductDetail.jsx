import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerProduct } from '../stores/action';
import { useParams, useHistory } from 'react-router-dom';
import { deleteSellerProduct } from '../stores/action';

import Alert from '@material-tailwind/react/Alert';
import Modal from '@material-tailwind/react/Modal';
import Button from '@material-tailwind/react/Button';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalHeader from '@material-tailwind/react/ModalHeader';
import ModalFooter from '@material-tailwind/react/ModalFooter';

export default function SellerProductDetail() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const sellerProduct = useSelector((state) => state.sellerProduct);

  useEffect(() => {
    dispatch(fetchSellerProduct(id));
  }, []);

  const deleteProduct = (id) => {
    dispatch(deleteSellerProduct(id));
    history.push('/seller');
  };

  const toEditPage = (id) => {
    history.push(`/seller/products/edit/${id}`);
  };

  const cancelBtn = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <section className="text-gray-600 flex body-font overflow-hidden">
      <div className="container lg:px-5 md:py-12 lg:py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex">
          <img
            alt="product"
            className="lg:w-2/5 sm:1/6 object-cover object-center rounded"
            src={sellerProduct?.picture}
          />
          <div className="lg:w-1/2 md:w-full sm:w-full w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
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
            <p className="leading-relaxed text-sm font-style: italic">
              Stock : {sellerProduct?.stock}
            </p>
            <p className="leading-relaxed text-sm font-style: italic mb-5">
              Weight : {sellerProduct?.weight} kg
            </p>

            {sellerProduct?.status === 'Eco' ? (
              <Alert buttonText="test" color="green">
                <b>ECO!</b> This Product is Eco Friendly !
              </Alert>
            ) : sellerProduct?.status === 'Warn' ? (
              <Alert buttonText="test" color="orange">
                <b>WARN!</b> This Product Contain{' '}
                {sellerProduct?.harmfulIngridient?.includes('')
                  ? ''
                  : sellerProduct?.harmfulIngridient?.length}{' '}
                non-Eco friendly ingrident, which is "
                {sellerProduct.harmfulIngridient.join(', ')}".
              </Alert>
            ) : (
              <Alert buttonText="test" color="red">
                <b>HARMFUL!</b> This Product is HARMFUL for our environment. It
                contains {sellerProduct?.harmfulIngridient?.length} non-Eco
                friendly ingridents, which is "
                {sellerProduct?.harmfulIngridient?.join(', ')}".
              </Alert>
            )}

            <div className="flex mt-10">
              <span className="title-font font-medium text-2xl text-gray-900">
                Rp {sellerProduct?.price?.toLocaleString('id-ID')}, 00
              </span>
              <Button
                className="flex ml-auto"
                color="teal"
                onClick={() => toEditPage(sellerProduct.id)}
                ripple="light"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
                <span className="ml-2">Edit Product</span>
              </Button>

              <Button
                className="flex mx-6"
                color="teal"
                onClick={() => setShowModal(true)}
                ripple="light"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
                <span className="ml-2">Delete Product</span>
              </Button>

              <Modal size="sm" active={showModal} toggler={(e) => cancelBtn(e)}>
                <ModalHeader toggler={(e) => cancelBtn(e)}>
                  Delete Product
                </ModalHeader>
                <ModalBody>
                  <p className="text-base leading-relaxed text-gray-600 font-normal">
                    Are you sure ? This action cannot be undone !
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="red"
                    buttonType="button"
                    onClick={(e) => cancelBtn(e)}
                    ripple="dark"
                  >
                    Cancel
                  </Button>

                  <Button
                    color="green"
                    onClick={(e) => deleteProduct(sellerProduct.id)}
                    ripple="light"
                  >
                    Proceed
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
