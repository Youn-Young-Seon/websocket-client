import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import './App.css';
import { useEffect, useState } from 'react';
import BoxPage from './BoxPage';

function App() {
  const [, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [data, setData] = useState({});
  
  const range = (start, end) => Array.from({ length: end - start }, (v, k) => k + start);
  const intStream = range(1, 11);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8081/gs-guide-websocket');
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('Connected');
        setConnected(true);
        
        client.subscribe('/box/fill', (message) => {
          let parseBody = JSON.parse(message.body);
          console.log(parseBody);
          setData(parseBody);
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

  return (
      <div>
        {
          intStream.map(i => <BoxPage key={i} 
            idx={i} 
            data={data} 
            stompClient={stompClient}
          />)
        }
      </div>
  );
}

export default App;
