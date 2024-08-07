import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import './App.css';
import { useEffect, useState } from 'react';
import BoxList from "./components/BoxList";

function App() {
  const [, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8081/gs-guide-websocket');
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('Connected');
        setConnected(true);
        
        client.subscribe('/box/fill', (message) => {
          console.log(message.body);
        });
      },
      onDisconnect: () => {
        setConnected(false);
        console.log('Disconnected');
      },
    });

    client.activate();
    setStompClient(client);
  }, []);

  const sendData = () => {
    stompClient.publish({
      destination: '/app/fill',
      body: JSON.stringify({
          boxTaskType: "PROGRESS",
          boxes: [
              { fill: false },
              { fill: false },
              { fill: false },
              { fill: false },
              { fill: false },
              { fill: false },
              { fill: false },
              { fill: false },
              { fill: false },
              { fill: false }
          ]
      }),
    });
  };

  return (
      <div>
        <div style={{display: "flex"}}>
          <BoxList/>
          <button type="button" onClick={sendData}>exec</button>
        </div>
        <div style={{display: "flex"}}>
          <BoxList/>
          <button type="button">exec</button>
        </div>
        <div style={{display: "flex"}}>
          <BoxList/>
          <button type="button">exec</button>
        </div>
        <div style={{display: "flex"}}>
          <BoxList/>
          <button type="button">exec</button>
        </div>
        <div style={{display: "flex"}}>
          <BoxList/>
          <button type="button">exec</button>
        </div>
      </div>
  );
}

export default App;
