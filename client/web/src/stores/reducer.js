import { ISLOADING_SET, ISREGISTER_SET } from './actionType';

const initialState = {
  user_id: 0,
  user_firstName: 'Guest',
  user_lastName: '',
  user_role: '',
  user_picture: '',
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
    default:
      return state;
  }
}
