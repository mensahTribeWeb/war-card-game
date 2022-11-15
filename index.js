
let deckId

/* handling a new deck */

function handleClick(){
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      deckId = data.deck_id
    }) 
}
document.getElementById("new-deck").addEventListener("click", handleClick)

// Draw

function drawCard() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    document.getElementById("cards").innerHTML = `
    <img src= ${data.cards[0].image} />
    <img src= ${data.cards[1].image} />
    `
  })
 
}
document.getElementById("draw").addEventListener("click", drawCard)

//DisplayCards




























// Docs for original Deck of Cards API: https://deckofcardsapi.com/#draw-card
// * BaseUrl you'll use: https://apis.scrimba.com/deckofcards/api/deck/
// * (that will replace the base url of https://deckofcardsapi.com/api/deck/)
// * that you'll see in the deck of cards API docs.