import React, { useContext, useState, useEffect } from 'react';
import Message from './Message';
import { ChatContext } from '../context/ChatContext';
import { onSnapshot } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../firebase';


const Messages = () => {
  const [ messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);


  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    });
    
    return () => {
      unsub();
    };
    },[data.chatId]);
  

  return (
    <div className="messages">
        {messages.map((m) => (
          <Message message={m} key={m.id}/>
        ))}
    </div>
  );
};

export default Messages;