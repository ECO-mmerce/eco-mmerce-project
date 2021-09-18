import React from 'react';
import { useParams } from 'react-router-dom';

export default function ChatRoom({ socket }) {
  const params = useParams();

  return <div>{params.targetId}</div>;
}
