import {
  ISLOADING_SET,
  ISLOGIN_SET,
  ISREGISTER_SET,
  USER_SET,
} from './actionType';
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

export function setIsLogin(bool) {
  return {
    type: ISLOGIN_SET,
    payload: bool,
  };
}

export function setUser(user) {
  return {
    type: USER_SET,
    payload: user,
  };
}

export function register(payload, role) {
  return async function (dispatch, getState) {
    try {
      dispatch(setIsLoading(true));
      const response = await fetch(baseUrl + `/${role}/register`, {
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
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
}

export function login(payload, role) {
  return async function (dispatch, getState) {
    try {
      dispatch(setIsLoading(true));
      const response = await fetch(baseUrl + `/${role}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        localStorage.access_token = data.access_token;
        localStorage.user_id = data.id;
        localStorage.user_firstName = data.firstName;
        localStorage.user_lastName = data.lastName;
        localStorage.user_role = data.role;
        localStorage.user_picture = data.picture;
        dispatch(setUser(data));
        dispatch(setIsLogin(true));
        toast.success('Logged in', toastOptions);
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
}

export function checkToken() {
  return async function (dispatch, getState) {
    try {
      if (localStorage.access_token) {
        const payload = {
          id: localStorage.user_id,
          firstName: localStorage.user_firstName,
          lastName: localStorage.user_lastName,
          role: localStorage.user_role,
          picture: localStorage.user_picture,
        };
        dispatch(setIsLogin(true));
        dispatch(setUser(payload));
      }
    } catch (err) {
      console.log(err);
    }
  };
}
