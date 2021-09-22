import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { editSellerProduct, fetchSellerProduct } from '../stores/action';

import Input from '@material-tailwind/react/Input';
import Button from '@material-tailwind/react/Button';
import Textarea from '@material-tailwind/react/Textarea';
import Modal from '@material-tailwind/react/Modal';
import ModalHeader from '@material-tailwind/react/ModalHeader';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';

export default function EditProduct() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sellerProduct = useSelector((state) => state.sellerProduct);
  const { id } = useParams();

  const [stock, setStock] = useState(0);
  const [weight, setWeight] = useState(0);

  const [showModal, setShowModal] = useState(false);

  const [category, setCategory] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    dispatch(fetchSellerProduct(id));
  }, []);

  useEffect(() => {
    setName(sellerProduct.name);
    setPrice(sellerProduct.price);
    setStock(sellerProduct.stock);
    setWeight(sellerProduct.weight);
    setCategoryId(sellerProduct?.Category?.id);
    setCategoryName(sellerProduct?.Category.name);
    setDescription(sellerProduct.description);
  }, [sellerProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const cancelBtn = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  const submitEditedProduct = (e) => {
    const payload = {
      name,
      price,
      stock,
      weight,
      description,
      CategoryId: category === '' ? categoryId : category,
    };
    dispatch(editSellerProduct(id, payload));
    history.push('/seller');
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
        <h1 className="text-4xl font-medium ">Edit Your Product</h1>
        <div className="flex p-5 items-center justify-center">
          <form
            encType="multipart/form-data"
            className="flex flex-col text-md my-5"
          >
            <div className="flex flex-col items-start mb-5">
              <Input
                type="text"
                color="green"
                size="lg"
                outline={true}
                value={name}
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
              />
            </div>
            <div className="flex flex-col items-start mb-10">
              <Input
                type="number"
                color="green"
                size="lg"
                outline={true}
                value={price}
                id="price"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Product Price"
              />
            </div>
            <div className="flex gap-5 w-full">
              <Input
                type="number"
                color="green"
                size="sm"
                outline={true}
                value={stock}
                id="stock"
                name="stock"
                onChange={(e) => setStock(e.target.value)}
                placeholder="Product Stock"
              />
              <Input
                type="number"
                color="green"
                size="sm"
                outline={true}
                value={weight}
                id="weight"
                name="weight"
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Product Weight"
              />

              <select
                className="block appearance-none w-full bg-white rounded-lg border border-gray-300 text-gray-400 focus:text-black px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey-200"
                id="CategoryId"
                name="CategoryId"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value={categoryId} selected hidden>
                  {categoryName}
                </option>
                <option value="1">Skincare</option>
                <option value="2">Cosmetic</option>
                <option value="3">Sanitary</option>
                <option value="4">Hygene</option>
              </select>
            </div>
            <div className="flex flex-col items-start my-5">
              <Textarea
                color="green"
                size="regular"
                outline={true}
                id="description"
                value={description}
                name="description"
                placeholder="Product Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <Modal size="sm" active={showModal} toggler={(e) => cancelBtn(e)}>
              <ModalHeader toggler={(e) => cancelBtn(e)}>
                Edit Product
              </ModalHeader>
              <ModalBody>
                <p className="text-base leading-relaxed text-gray-600 font-normal">
                  Are you sure ?
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
                  onClick={(e) => submitEditedProduct(e)}
                  ripple="light"
                >
                  Proceed
                </Button>
              </ModalFooter>
            </Modal>

            <Button
              type="submit"
              color="green"
              buttonType="filled"
              size="lg"
              block={false}
              iconOnly={false}
              ripple="light"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Edit Product
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
