import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchChatList, setChatWith } from '../stores/action';

export default function ChatList({ socket }) {
  const { chatList, user_id } = useSelector(({ chatList, user_id }) => {
    return {
      chatList,
      user_id,
    };
  });

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchChatList());
  }, [dispatch]);

  const goToChatRoom = (buyerId, buyerName) => () => {
    dispatch(setChatWith({ id: buyerId, name: buyerName })); // dapet dari hasil getAll chat
    socket.emit('joinRoom', {
      sellerId: user_id,
      buyerId: buyerId,
    });
    history.push('/chat');
  };

  return (
    <div>
      <ul>
        {chatList.map((chatItem, i) => {
          const buyerName = `${chatItem.User.firstName} ${chatItem.User.lastName}`;
          return (
            <li
              onClick={goToChatRoom(chatItem.BuyerId, buyerName)}
              key={'chatitem-' + i}
            >
              {buyerName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
