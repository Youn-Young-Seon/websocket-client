import { useEffect, useState } from "react";
import BoxList from "./components/BoxList";

function BoxPage({ idx, data, stompClient }) {
    const [taskType, setTaskType] = useState(null);

    const sendData = (idx) => {
        stompClient.publish({
          destination: '/app/fill',
          body: JSON.stringify({
              idx,
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

    useEffect(() => {
        if(idx === data.idx) setTaskType(data.boxTaskType);
    }, [idx, data]);

    return (
        <div style={{display: "flex"}}>
            <BoxList idx={idx} data={data} />
            {
                 (taskType === "PROGRESS") ?
                    <span>PROGRESS</span> : 
                    (taskType === "WAIT") ? 
                        <span>WAIT</span> :
                        <button type="button" onClick={() => {
                            sendData(idx);
                            setTaskType("WAIT")
                        }}>exec</button>
            }
        </div>
    )
}

export default BoxPage;