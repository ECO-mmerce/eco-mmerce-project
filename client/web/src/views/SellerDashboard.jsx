import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ChatList from '../components/ChatList';

export default function SellerDashboard({ socket }) {
  const history = useHistory();
  const { isLogin, user_role } = useSelector(({ isLogin, user_role }) => {
    return {
      isLogin,
      user_role,
    };
  });

  useEffect(() => {
    if (user_role === 'buyer') {
      history.push('/');
    } else if (!isLogin) {
      history.push('/seller/login');
    }
  }, [isLogin, user_role, history]);

  return (
    <div>{user_role === 'seller' ? <ChatList socket={socket} /> : null}</div>
  );
}
