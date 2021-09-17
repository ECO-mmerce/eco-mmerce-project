import { ISLOADING_SET, ISREGISTER_SET, USER_SET } from './actionType';
import { toast } from 'react-toastify';

const baseUrl = 'http://localhost:4000';

const toastOptions = {
  position: 'bottom-right',
  theme: 'light',
};

export function setIsLoading(bool) {
  return {
    type: ISLOADING_SET,
    payload: bool,
  };
}

export function setIsRegister(bool) {
  return {
    type: ISREGISTER_SET,
    payload: bool,
  };
}

export function setUser(user) {
  return {
    type: USER_SET,
    payload: user,
  };
}

export function registerBuyer(payload) {
  return async function (dispatch, getState) {
    try {
      dispatch(setIsLoading(true));
      const response = await fetch(baseUrl + '/buyers/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: payload,
      });
      const data = await response.json();

      if (response.status === 201) {
        toast.success('Register successful', toastOptions);
        dispatch(setIsRegister(true));
      } else {
        if (Array.isArray(data)) {
          data.forEach((error) => {
            toast.error(error.message, toastOptions);
          });
        } else {
          toast.error(data.message, toastOptions);
        }
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };
}
