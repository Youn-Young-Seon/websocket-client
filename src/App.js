import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [samsungPrice, samsungPriceSet] = useState(0);
  const [LGPrice, LGPriceSet] = useState(0);
  const [naverPrice, naverPriceSet] = useState(0);
  const [kakaoPrice, kakaoPriceSet] = useState(0);

  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8081/gs-guide-websocket');
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        setConnected(true);
        
        client.subscribe('/topic/trade', (message) => {
          console.log(message);
          // showGreeting(JSON.parse(message.body).content);
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
    if (stompClient && connected) {
      stompClient.publish({
        destination: '/app/trade',
        body: JSON.stringify({ name: "dd" }),
      });
    }
  };
  

  return (
    <div>
      <div>Samsung: </div>
      <div>LG: </div>
      <div>Naver: </div>
      <div>Kakao: </div>
    </div>
  );
}

export default App;
