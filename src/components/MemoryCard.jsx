import React from "react";
import './Card.css'

const MemoryCard = (props) => {

    let flip = props.isFlipped === 'false' ? "MemoryCardInner" : "MemoryCardInner flipped";

    return (
        <div className="MemoryCard" onClick={props.pickCard}>
        <div className={flip}>
        <div className="MemoryCardBack"> <img src='https://www.digitalcrafts.com/media/Default/assets/logos/dc-logo.svg'></img></div>
        <div className="MemoryCardFront">{props.symbol}</div>
        </div>
        </div>
    )
}

export default MemoryCard;