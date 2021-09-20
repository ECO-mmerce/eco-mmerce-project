import {
  CHATWITH_SET,
  ISLOADING_SET,
  ISLOGIN_SET,
  ISREGISTER_SET,
  MESSAGES_SET,
  USER_SET,
  PRODUCTS_SET,
  PRODUCT_SET,
  CART_SET,
  HISTORY_SET,
  CHATLIST_SET,
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

export function setMessages(messages) {
  return {
    type: MESSAGES_SET,
    payload: messages,
  };
}

export function setChatWith(payload) {
  return {
    type: CHATWITH_SET,
    payload: payload,
  };
}

export function setProducts(payload) {
  return {
    type: PRODUCTS_SET,
    payload: payload,
  };
}

export function setProduct(payload) {
  return {
    type: PRODUCT_SET,
    payload: payload,
  };
}

export function setCart(payload) {
  return {
    type: CART_SET,
    payload: payload,
  };
}

export function setHistory(payload) {
  return {
    type: HISTORY_SET,
    payload: payload,
  };
}

export function setChatList(chatList) {
  return {
    type: CHATLIST_SET,
    payload: chatList,
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

export function fetchMessages() {
  return async function (dispatch, getState) {
    try {
      const { chatWithId } = getState();
      const response = await fetch(baseUrl + '/chats/' + chatWithId, {
        headers: {
          access_token: localStorage.access_token,
        },
      });
      const data = await response.json();
      dispatch(setMessages(data));
    } catch (err) {
      console.log(err);
    }
  };
}

export function addMessage(message) {
  return function (dispatch, getState) {
    const { messages } = getState();
    const newMessages = [...messages, message];
    dispatch(setMessages(newMessages));
  };
}

export function fetchProducts() {
  return async function (dispatch, getState) {
    try {
      const response = await fetch(baseUrl + `/buyers/products`);
      const data = await response.json();
      dispatch(setProducts(data));
    } catch (err) {
      console.log(err);
    }
  };
}

export function fetchProduct(id) {
  return async function (dispatch, getState) {
    try {
      dispatch(setIsLoading(true));
      const response = await fetch(baseUrl + `/buyers/products/${id}`);
      const data = await response.json();

      dispatch(setProduct(data));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
}

export function fetchCart() {
  return async function (dispatch, getState) {
    try {
      const response = await fetch(baseUrl + '/buyers/carts', {
        headers: {
          access_token: localStorage.access_token,
        },
      });
      const data = await response.json();
      dispatch(setCart(data));
    } catch (err) {
      console.log(err);
    }
  };
}

export function fetchChatList() {
  return async function (dispatch, getState) {
    try {
      dispatch(setIsLoading(true));
      const response = await fetch(baseUrl + '/sellers/chats', {
        headers: {
          access_token: localStorage.access_token,
        },
      });
      const data = await response.json();
      dispatch(setChatList(data));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
}

export function addCart(id) {
  return async function (dispatch, getState) {
    try {
      const response = await fetch(baseUrl + '/buyers/carts', {
        method: 'POST',
        headers: {
          access_token: localStorage.access_token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ProductId: id }),
      });

      const { message } = await response.json();

      if (response.status === 201) {
        dispatch(fetchCart());
        toast.success(message, toastOptions);
      } else {
        toast.error(message, toastOptions);
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export function removeQty(id) {
  return async function (dispatch, getState) {
    try {
      const response = await fetch(baseUrl + `/buyers/carts/${id}`, {
        method: 'DELETE',
        headers: {
          access_token: localStorage.access_token,
        },
      });

      const { message } = await response.json();

      if (response.status === 200) {
        dispatch(fetchCart());
        toast.success(message, toastOptions);
      } else {
        toast.error(message, toastOptions);
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export function deleteCart(id) {
  return async function (dispatch, getState) {
    try {
      const response = await fetch(baseUrl + '/buyers/carts', {
        method: 'DELETE',
        headers: {
          access_token: localStorage.access_token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ProductId: id }),
      });

      const { message } = await response.json();

      if (response.status === 200) {
        dispatch(fetchCart());
        toast.success(message, toastOptions);
      } else {
        toast.error(message, toastOptions);
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export function checkOutCart() {
  return async function (dispatch, getState) {
    try {
      const response = await fetch(baseUrl + '/buyers/carts/checkout', {
        method: 'POST',
        headers: {
          access_token: localStorage.access_token,
        },
      });

      // const { message } = await response.json();
      const data = await response.json();

      if (response.status === 201) {
        // dispatch(setCart([]));
        // toast.success(message, toastOptions);

        return data;
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export function fetchHistory() {
  return async function (dispatch, getState) {
    try {
      const response = await fetch(baseUrl + '/buyers/history', {
        headers: {
          access_token: localStorage.access_token,
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        dispatch(setHistory(data));
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export function googleLogin(payload, role) {
  return async function (dispatch, getState) {
    try {
      console.log(payload);
      // dispatch(setIsLoading(true));
      const response = await fetch(baseUrl + `/${role}s/login/google`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept',
        },
        credentials: 'same-origin',
        mode: 'cors',
        body: JSON.stringify({ idToken: payload.tokenId }),
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200 || response.status === 201) {
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
