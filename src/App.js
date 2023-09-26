import "./App.css";
import MemoryCard from "./components/MemoryCard";
import React, { useState, useEffect } from "react";

function App() {
  
  function generateDeck() {
    const symbols = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let deck = [];
    for (let i = 0; i < 16; i++) {
      let card = {isFlipped: "false", symbol: symbols[i % 8] };
      deck.push(card);
    }
    return shuffle(deck);
  }
  
  function shuffle(a) {
    var j, x;
    for (let i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }
  const [deck, setDeck] = useState([]);
  const [pickedCards, setPickedCards] = useState([]);
  
  useEffect(() => {
    setDeck(generateDeck());
  }, [setDeck]);


  function unflipCards (card1Index, card2Index) {
      let card1 = {...deck[card1Index], isFlipped: "false"}
      let card2 = {...deck[card2Index], isFlipped: "false"}
      let newDeck = deck.map((card, index) => {
        if (card1Index === index) {
          return card1
        } if (card2Index === index) {
          return card2
        }
          return card;
      })
    setDeck(newDeck)
  }
  
  let cardsJSX = deck.map((card, index) => {
    return <MemoryCard symbol={card.symbol} isFlipped={card.isFlipped} key={index} pickCard={() => pickCard(index)} />
  });

  function pickCard(cardIndex) {
    if (deck[cardIndex].isFlipped === "false") {
    let cardToFlip = { ...deck[cardIndex], isFlipped: "true"};
    let newPickedCards = pickedCards.concat(cardIndex);
    let newDeck = deck.map((card, index) => {
      if (cardIndex === index) {
        return cardToFlip
      }
      return card;
      }); 

    if (newPickedCards.length === 2) {
      const card1Index = newPickedCards[0]
      const card2Index = newPickedCards[1]
        if (deck[card1Index].symbol !== deck[card2Index].symbol) {
          setTimeout(()  => {unflipCards(card1Index, card2Index); setPickedCards([]);}, 1000)
        } else {
          newPickedCards =[]
        }
      }
    setDeck(newDeck)
    setPickedCards(newPickedCards)
  } else if (deck[cardIndex].isFlipped === "true") {
    return;
  }
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>Memory Game</h1>
        <h3>Match Cards to Win</h3>
      </header>
      <div>{cardsJSX.slice(0, 4)}</div>
      <div>{cardsJSX.slice(4, 8)}</div>
      <div>{cardsJSX.slice(8, 12)}</div>
      <div>{cardsJSX.slice(12, 16)}</div>
    </div>
  );
}

export default App;
