import { createContext, useEffect, useRef, useState } from "react";
import config from "../config/config";

export const WebsocketContext = createContext({
  isReady: false,
  value: null,
  sendMessage: () => {},
});

export const WebsocketProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [value, setValue] = useState(null);

  const ws = useRef(null);

  const sendMessage = (message) => {
    if (isReady) {
      ws.current.send(message);
    } else {
      console.error(
        "Tentativa de enviar mensagem quando a conexão não está pronta."
      );
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

  return (
    <WebsocketContext.Provider value={{ isReady, value, sendMessage }}>
      {children}
    </WebsocketContext.Provider>
  );
};
