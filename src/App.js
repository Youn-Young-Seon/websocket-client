import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [samsungPrice, setSamsungPrice] = useState(0);

  const [, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8081/gs-guide-websocket');
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('Connected');
        setConnected(true);
        
        client.subscribe('/topic/trade', (message) => {
          console.log(message.body);
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
    stompClient.publish({
      destination: '/app/trade',
      body: JSON.stringify({
        tradeType: "BUY", 
        stocks: [ { stockType: "SAMSUNG", name: "Samsung", price: 80000 } ],
        customer: "test"
      }),
    });
  };

  return (
      <div>
        <div>
          <p> [Samsung] price: {samsungPrice}</p>
        </div>
        <div>
          <p>
            <input type="hidden" name="buy"/>
            <input type="number" name="price"/>
            <input type="number" name="count"/>
            <button onClick={sendData}>매수</button>
          </p>
          <p>
            <input type="hidden" name="sell"/>
            <input type="number" name="price"/>
            <input type="number" name="count"/>
            <button onClick={sendData}>매도</button>
          </p>
        </div>
      </div>
  );
}

export default App;
