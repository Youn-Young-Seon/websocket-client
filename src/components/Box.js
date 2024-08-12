import {useEffect, useState} from "react";

function Box({ idx, boxIdx, data }) {
    const [fill, setFill] = useState(false);

    const blankBox = { width: '25px', height: '25px', border: '1px solid black' }
    const filledBox = { width: '25px', height: '25px', border: '1px solid black', backgroundColor: 'gray' }

    useEffect(() => {
        if (idx === data.idx) {
            let box = data.boxes[boxIdx - 1];
            if (box.fill) setFill(true);
            else setFill(false);
        }
    }, [boxIdx, data, idx]);

    return (
        <>
        {
            fill ? 
                <div style={ filledBox }></div> : 
                <div style={ blankBox }></div>
        }
        </>
    )
}

export default Box;