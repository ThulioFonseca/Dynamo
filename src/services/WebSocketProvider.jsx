import { createContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

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
  const timeoutRef = useRef(null);

  const sendMessage = (message) => {
    if (isReady) {
      ws.current.send(message);
    } else {
      console.error("Conexão não estabelecida");
    }
  };

  const handleOpen = () => {
    setIsReady(true);
    resetTimeout();
  };

  const handleClose = () => {
    setIsReady(false);
  };

  const handleMessage = (event) => {
    const data = JSON.parse(event.data);
    setValue(data);
    resetTimeout();
  };

  const resetTimeout = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      console.log("Fechando conexão devido à inatividade.");
      ws.current.close();
      createWebSocket();
    }, 20000); // 20 segundos
  };

  const createWebSocket = () => {
    const socket = new WebSocket(import.meta.env.VITE_WEB_SOCKET);

    socket.onopen = handleOpen;
    socket.onclose = handleClose;
    socket.onmessage = handleMessage;

    ws.current = socket;
  };

  useEffect(() => {
    createWebSocket();

    return () => {
      clearTimeout(timeoutRef.current);
      ws.current.close();
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

  useEffect(() => {
    if (isReady) {
      toast.success("WebSocket conectado!", {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
      });
    } else {
      toast.error("WebSocket desconectado!", {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
      });
    }
  }, [isReady]);

  return (
    <WebsocketContext.Provider
      value={{ isReady, value, historic, sendMessage }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};
