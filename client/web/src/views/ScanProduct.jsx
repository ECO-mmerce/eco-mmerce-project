import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { scanProduct } from '../stores/action';

import Modal from '@material-tailwind/react/Modal';
import ModalHeader from '@material-tailwind/react/ModalHeader';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';
import Button from '@material-tailwind/react/Button';
import Alert from '@material-tailwind/react/Alert';

export default function ScanProduct() {
  const formScan = useRef(null);
  const [picturePath, setPicturePath] = useState('');
  const [modal, setModal] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formScan.current);

    dispatch(scanProduct(formData))
      .then((data) => {
        if (data.ingridients) {
          setScanResult(data.ingridients);
        } else {
          setModal(false);
        }
      })
      .catch((err) => {
        toast.error(
          'We cannot scan the image, please try another photo ',
          toastOptions
        );
      });

    setModal(true);
  };

  const toastOptions = {
    position: 'bottom-right',
    theme: 'light',
  };

  console.log(scanResult, `INI HASIL`);

  const getPicturePath = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e[0]);

    reader.onloadend = () => {
      setPicturePath(reader.result);
    };
  };

  const cancelBtn = (e) => {
    e.preventDefault();

    setModal(false);
    setScanResult(null);
  };

  const redirectBtn = (e) => {
    e.preventDefault();

    setModal(false);
    setScanResult(null);

    history.push('/');
  };

  const scanAgain = (e) => {
    e.preventDefault();

    setModal(false);
    setScanResult(null);
  };

  return (
    <section className="flex w-full h-full my-10 justify-center">
      <div className="bg-white rounded-xl py-5 text-center">
        <div className="flex justify-center">
          <img
            className="w-1/3"
            src="https://ik.imagekit.io/ztg2jcaeb0e/ecommerce/eco-merce_1__BX5HSOkuz.png?updatedAt=1631834431042"
            alt=""
          />
        </div>
        <h1 className="text-4xl mb-12 font-medium">Scan a Product</h1>
        <form
          className="flex flex-col text-md mx-12 gap-5 my-5 items-center"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          ref={formScan}
        >
          <div className="py-2 bg-white px-2">
            <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
              <div className="md:flex">
                <div className="w-full p-3">
                  <div className="relative border-dotted h-48 rounded-lg border-dashed border-2 border-green-700 bg-gray-100 flex justify-center items-center">
                    <div className="absolute">
                      <div className="flex flex-col items-center">
                        {' '}
                        <i className="fa fa-folder-open fa-4x text-green-700"></i>{' '}
                        <span className="block text-green-900 font-normal">
                          Attach your files here
                        </span>{' '}
                      </div>
                    </div>{' '}
                    <input
                      className="opacity-0"
                      type="file"
                      name="ingredients"
                      id="ingredients"
                      onChange={(e) => getPicturePath(e.target.files)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center pb-8 w-full justify-evenly">
            {picturePath ? (
              <label className="flex items-center">
                <img
                  className="rounded-lg"
                  width="315"
                  length="315"
                  src={picturePath}
                />
              </label>
            ) : null}
          </div>

          <Button
            type="submit"
            color="green"
            buttonType="filled"
            size="lg"
            block={false}
            iconOnly={false}
            ripple="light"
          >
            Submit
          </Button>
        </form>

        <Modal size="sm" active={modal} toggler={(e) => cancelBtn(e)}>
          <ModalHeader toggler={(e) => cancelBtn(e)}>Scan Image</ModalHeader>
          <ModalBody>
            <p className="text-base mb-4 leading-relaxed text-gray-600 font-normal">
              Please wait a moment, results will appear below :
            </p>

            {scanResult === null ? (
              <div className="mx-auto">
                <center>
                  <lottie-player
                    src="https://assets2.lottiefiles.com/packages/lf20_x9pEKm.json"
                    background="transparent"
                    speed="0.5"
                    style={{ width: 100, height: 100 }}
                    loop
                    autoplay
                  />
                </center>
              </div>
            ) : scanResult?.status === 'Eco' ? (
              <Alert buttonText="test" color="green">
                <b>ECO!</b> This Product is Eco Friendly !
              </Alert>
            ) : scanResult?.status === 'Warn' ? (
              <Alert buttonText="test" color="orange">
                <b>WARN!</b> This Product Contain{' '}
                {scanResult?.harmfulIngridient?.includes('')
                  ? ''
                  : scanResult?.harmfulIngridient?.length}{' '}
                non-Eco friendly ingrident, which is "
                {scanResult?.harmfulIngridient.join(', ')}".
              </Alert>
            ) : (
              <Alert buttonText="test" color="red">
                <b>HARMFUL!</b> This product is HARMFUL for our environment. It
                contains {scanResult?.harmfulIngridient?.length} non-Eco
                friendly ingridents, which is "
                {scanResult?.harmfulIngridient?.join(', ')}".
              </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="green"
              buttonType="button"
              onClick={(e) => redirectBtn(e)}
              ripple="dark"
            >
              Ok
            </Button>
            <Button
              color="teal"
              buttonType="button"
              onClick={(e) => scanAgain(e)}
              ripple="dark"
            >
              Scan Another Product
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </section>
  );
}
