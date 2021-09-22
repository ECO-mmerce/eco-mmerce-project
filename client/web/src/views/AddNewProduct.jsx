import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addProduct, setIsLoading } from '../stores/action';
import { useDispatch } from 'react-redux';

import Input from '@material-tailwind/react/Input';
import Button from '@material-tailwind/react/Button';
import Textarea from '@material-tailwind/react/Textarea';
import Modal from '@material-tailwind/react/Modal';
import ModalHeader from '@material-tailwind/react/ModalHeader';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';
import { toast } from 'react-toastify';

export default function AddNewProduct() {
  const history = useHistory();
  const formAddProduct = useRef(null);
  const dispatch = useDispatch();
  const [productImage, setProductImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [ingredientsImage, setIngredientsImage] = useState('');

  const toastOptions = {
    position: 'bottom-right',
    theme: 'light',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const uploadProduct = (e) => {
    e.preventDefault();
    const formData = new FormData(formAddProduct.current);

    if (!formData) {
      setShowModal(false);
      toast.error('All the required field must be filled !', toastOptions);
    } else {
      setShowModal(false);
      dispatch(addProduct(formData)).then((data) => {
        if (data) {
          history.push('/seller');
        }
      });
    }
  };

  const cancelBtn = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  const getProductImage = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e[0]);

    reader.onloadend = () => {
      setProductImage(reader.result);
    };
  };

  const getIngredientsImage = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e[0]);

    reader.onloadend = () => {
      setIngredientsImage(reader.result);
    };
  };

  return (
    <section className="flex justify-center my-10">
      <div className="w-1/2 bg-white rounded-xl py-10 text-center flex-col items-center">
        <div className="flex justify-center">
          <img
            className="w-1/6"
            src="https://ik.imagekit.io/ztg2jcaeb0e/ecommerce/eco-merce_1__BX5HSOkuz.png?updatedAt=1631834431042"
            alt=""
          />
        </div>
        <h1 className="text-4xl my-4 font-medium ">Add new product</h1>
        <div className="flex p-5 items-center justify-center">
          <form
            ref={formAddProduct}
            encType="multipart/form-data"
            className="flex flex-col text-md my-5"
          >
            <div className="flex flex-col items-start mb-5">
              <Input
                type="text"
                color="green"
                size="lg"
                outline={true}
                placeholder="Product Name"
                id="name"
                name="name"
              />
            </div>
            <div className="flex flex-col items-start mb-10">
              <Input
                type="number"
                color="green"
                size="lg"
                outline={true}
                placeholder="Product Price"
                id="price"
                name="price"
              />
            </div>
            <div className="flex flex-col items-start mb-10">
              <Input
                type="text"
                color="green"
                size="lg"
                outline={true}
                placeholder="Product Brand"
                id="brand"
                name="brand"
              />
            </div>
            <div className="flex gap-5 w-full">
              <Input
                type="number"
                color="green"
                size="sm"
                outline={true}
                placeholder="Stock"
                id="stock"
                name="stock"
              />
              <Input
                type="number"
                color="green"
                size="sm"
                outline={true}
                placeholder="Weight"
                id="weight"
                name="weight"
              />

              <select
                className="block appearance-none w-full bg-white rounded-lg border border-gray-300 text-gray-400 focus:text-black px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey-200"
                id="CategoryId"
                name="CategoryId"
              >
                <option selected disabled hidden>
                  Select Category
                </option>
                <option value="1">Hair</option>
                <option value="2">Face</option>
                <option value="3">Body</option>
              </select>
            </div>
            <div className="flex flex-col items-start my-5">
              <Textarea
                color="green"
                size="regular"
                outline={true}
                id="description"
                name="description"
                placeholder="Product Description"
              />
            </div>

            <div className="items-center w-full grid gap-5 grid-cols-2 justify-evenly">
              <label className="flex flex-col items-center px-4 py-6 bg-green-100 text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-green-800">
                <svg
                  className="w-8 h-8"
                  fill="green"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 font-black text-lg leading-normal uppercase mb-2">
                  Product Image
                </span>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) => getProductImage(e.target.files)}
                  className="hidden"
                />
              </label>

              <label className="flex flex-col items-center px-4 py-6 bg-green-100 text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-green-800">
                <svg
                  className="w-8 h-8"
                  fill="green"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 font-black text-lg leading-normal uppercase mb-2">
                  Product Ingridients
                </span>
                <input
                  type="file"
                  name="ingredients"
                  id="ingredients"
                  onChange={(e) => getIngredientsImage(e.target.files)}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-2 my-6 gap-5 items-center w-full justify-evenly">
              {productImage ? (
                <label className="flex flex-col items-center">
                  <img
                    className="rounded-lg"
                    width="125"
                    length="125"
                    src={productImage}
                  />
                </label>
              ) : null}

              {ingredientsImage ? (
                <label className="flex flex-col items-center">
                  <img
                    className="rounded-lg"
                    width="125"
                    length="125"
                    src={ingredientsImage}
                  />
                </label>
              ) : null}
            </div>

            <Modal
              size="sm"
              active={showModal}
              toggler={() => setShowModal(false)}
            >
              <ModalHeader toggler={() => setShowModal(false)}>
                Upload Product
              </ModalHeader>
              <ModalBody>
                <p className="text-base leading-relaxed text-gray-600 font-normal">
                  Are you sure ? All uploaded pictures cannot be edited, but you
                  can edit other stuff later.
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
                  onClick={(e) => uploadProduct(e)}
                  ripple="light"
                >
                  Proceed
                </Button>
              </ModalFooter>
            </Modal>

            <Button
              type="button"
              color="green"
              buttonType="filled"
              size="lg"
              block={false}
              iconOnly={false}
              ripple="light"
              onClick={(e) => handleSubmit(e)}
            >
              Add Product
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
