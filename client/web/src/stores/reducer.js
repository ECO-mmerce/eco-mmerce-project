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
  SELLER_PRODUCTS_SET,
  SELLER_PRODUCT_DETAIL_SET,
} from './actionType';

const initialState = {
  user_id: 0,
  user_firstName: 'Guest',
  user_lastName: '',
  user_role: '',
  user_picture: '',
  isLogin: false,
  isLoading: false,
  isRegister: false,
  messages: [],
  chatWithId: 0,
  chatWithName: '',
  products: [],
  product: {},
  cart: [],
  history: [],
  chatList: [],
  sellerProducts: [],
  sellerProduct: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ISLOADING_SET:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ISREGISTER_SET:
      return {
        ...state,
        isRegister: action.payload,
      };
    case ISLOGIN_SET:
      return {
        ...state,
        isLogin: action.payload,
      };
    case USER_SET:
      return {
        ...state,
        user_id: action.payload.id,
        user_firstName: action.payload.firstName,
        user_lastName: action.payload.lastName,
        user_role: action.payload.role,
        user_picture: action.payload.picture,
      };
    case MESSAGES_SET:
      return {
        ...state,
        messages: action.payload,
      };
    case CHATWITH_SET:
      return {
        ...state,
        chatWithId: action.payload.id,
        chatWithName: action.payload.name,
      };
    case PRODUCTS_SET:
      return {
        ...state,
        products: action.payload,
      };
    case PRODUCT_SET:
      return {
        ...state,
        product: action.payload,
      };
    case CART_SET:
      return {
        ...state,
        cart: action.payload,
      };
    case HISTORY_SET:
      return {
        ...state,
        history: action.payload,
      };
    case CHATLIST_SET:
      return {
        ...state,
        chatList: action.payload,
      };
    case SELLER_PRODUCTS_SET:
      return {
        ...state,
        sellerProducts: action.payload,
      };
    case SELLER_PRODUCT_DETAIL_SET:
      return {
        ...state,
        sellerProduct: action.payload,
      };
    default:
      return state;
  }
}
