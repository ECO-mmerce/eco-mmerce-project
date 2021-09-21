import React, {useEffect, useRef } from "react"
import { useSelector } from "react-redux";

export default function ChatBox({messages,user_firstName, user_lastName}) {
  const messageEndRef = useRef(null)
  // const scrollToBottom = () => {
  //   messageEndRef.current.scrollIntoView({behavior: 'smooth'})
  // }

  // useEffect(scrollToBottom, [messages])

  const displayMessages = messages.map((message, i) => {
    return (
      <div key={'chatmessage-' + i} className={`p-2 flex flex-col w-full  ${ message.fullName === user_firstName+' '+user_lastName ? `items-end`: `items-start`}`}>
        <p className="text-lg font-bold m-1 w-max-1/2">
          {message.fullName}
        </p>
          <p className="text-xl bg-green-200 px-5 py-1 rounded-lg">
            {message.message}
          </p>
      </div>
    );
  })
  return (
    <div className="flex flex-col">
      {displayMessages}
      <div ref={messageEndRef}/>
    </div>
  )
}