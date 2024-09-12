import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [msg, setMsg] = useState<string[]>([]);
  const[newMessage,setNewMessage] = useState("")
  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
    newSocket.onopen = () => {
      console.log("Connection is made");
      newSocket.send("hello from client");
      setSocket(newSocket);
    };

    // when any message is received from the server
    newSocket.onmessage = (message) => {
      console.log("Message received:", message.data);
      setMsg((m) => [...m, message.data]);
    };

    // Cleanup when the component unmounts
    return () => newSocket.close();
  }, []);

   if (!socket) {
      return <div>Server is Loading...</div>;
    }
  return (
    <div>
      <input onChange={(e)=>{setNewMessage(e.target.value)}}></input>
      <button onClick={() => socket?.send(newMessage)}>Send</button>
      {msg.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
}

export default App;
