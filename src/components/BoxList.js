import Box from "./Box";

function BoxList({ idx, boxTaskType }) {
    const range = (start, end) => Array.from({ length: end - start }, (v, k) => k + start);
    const boxCnt = range(1, 11);

    return (
        <div style={{display: "flex"}}>
            {
                boxCnt.map(i => (<Box key={i} idx={idx} boxTaskType={boxTaskType} />))
            }
        </div>
    );
}

export default BoxList;