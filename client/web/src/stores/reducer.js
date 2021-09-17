import {
  ISLOADING_SET,
  ISLOGIN_SET,
  ISREGISTER_SET,
  USER_SET,
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
    default:
      return state;
  }
}
