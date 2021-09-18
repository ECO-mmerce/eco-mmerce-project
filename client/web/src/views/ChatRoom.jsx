import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addMessage } from '../stores/action';

export default function ChatRoom({ socket }) {
  const {
    user_id,
    user_firstName,
    user_lastName,
    user_role,
    isLogin,
    messages,
    //chatwithId,
    //chatwithName
  } = useSelector(
    ({
      user_id,
      user_firstName,
      user_lastName,
      user_role,
      isLogin,
      messages,
    }) => {
      return {
        user_id,
        user_firstName,
        user_lastName,
        user_role,
        isLogin,
        messages,
      };
    }
  );
  const [chat, setChat] = useState('');

  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogin) {
      history.push('/');
      toast.info('Please login first', {
        position: 'bottom-right',
        theme: 'light',
      });
    }
  }, [isLogin, history]);

  useEffect(() => {
    socket.on('message', (message) => {
      dispatch(addMessage(message));
    });
  }, [socket]);

  const handleSend = () => {
    socket.emit('chat', {
      message: {
        buyerId: user_role === 'buyer' ? user_id : params.targetId,
        sellerId: user_role === 'buyer' ? params.targetId : user_id,
        message: chat,
        name: user_firstName + ' ' + user_lastName,
      },
    });
  };

  return (
    <div>
      {params.targetId}
      <ul>
        {messages.map((message, i) => {
          return (
            <li key={'chatmessage-' + i}>
              {message.name}|{message.message}
            </li>
          );
        })}
      </ul>
      <input
        type="text"
        value={chat}
        onChange={(e) => setChat(e.currentTarget.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
