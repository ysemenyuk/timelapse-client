import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000';

export default function useSocket() {
  const [messages, setMessages] = useState([]);

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(SERVER_URL);

    socketRef.current.emit('messages:get');

    socketRef.current.on('messages', (mes) => {
      setMessages(mes);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socketRef.current.emit('message:add', 5);
  };

  // console.log(1111222, socketRef.current);
  // console.log(1111222, messages);

  return [messages, sendMessage];
}
