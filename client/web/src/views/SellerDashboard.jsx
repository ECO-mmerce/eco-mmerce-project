import React from 'react';
import ChatList from '../components/ChatList';

export default function SellerDashboard({ socket }) {
  return (
    <div>
      <ChatList socket={socket} />
    </div>
  );
}
