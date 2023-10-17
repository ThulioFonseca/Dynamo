import { createContext, useEffect, useRef, useState } from "react";

export const WebsocketContext = createContext({
  isReady: false,
  value: null,
  historic: [],
  sendMessage: () => {},
});

export const WebsocketProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [value, setValue] = useState(null);
  const [historic, setHistoric] = useState([]);

  const ws = useRef(null);

  const sendMessage = (message) => {
    if (isReady) {
      ws.current.send(message);
    } else {
      console.error("Conexão não estabelecida");
    }
  };

  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_WEB_SOCKET);

    socket.onopen = () => {
      setIsReady(true);
    };

    socket.onclose = () => {
      setIsReady(false);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setValue(data);
    };

    ws.current = socket;

    return () => {
      //ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (value) {
      setHistoric((prevHistoric) => {
        const newHistoric = [...prevHistoric, value];
        if (newHistoric.length > 10) {
          newHistoric.splice(0, newHistoric.length - 10);
        }
        return newHistoric;
      });
    }
  }, [value]);

  return (
    <WebsocketContext.Provider
      value={{ isReady, value, historic, sendMessage }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};
