import Stomp from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [samsungPrice, samsungPriceSet] = useState(0);
  const [LGPrice, LGPriceSet] = useState(0);
  const [naverPrice, naverPriceSet] = useState(0);
  const [kakaoPrice, kakaoPriceSet] = useState(0);

  useEffect(() => {
    const socket = new SockJS('/gs-guid-websocket');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      console.log("connected");

      stompClient.subscribe('/topic/trade', (message) => {
        console.log(message);
      });
    });

    return () => {
      if(stompClient !== null) {
        stompClient.disconnect();
      }
    };
  }, []);

  const sendData = () => {
    if(stompClient) {
      stompClient.send('/app/trade', {}, JSON.stringify(""));
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
