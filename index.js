/**
 
  *,-------------------.
( WHAT EEEEES IT MAN? )
 `-------------------'
        '
          \                ,-_
                          ',' )
/|_\|/_/|              _// ,'
, ,--,-. .           ,'  / ,
/ ( O _O ) \        _;___    .
|  (___)'  |        ()/()/   ,
|.   ,     |        ,>     ,'
/  '-'\__,' |         |  /',\
//|.      \\\ \        '^;  <-^.
||| ,     `-'|\\             )  '
|||        ' |||        _n___|/, |
c  D  '    ,  c  D      -_ ---,'  |
UU '  '-'   ' UU         U   <   (
  \  __  /                ,.-. ._,.
__||  ||__              ((   `'- |
(___/  \___) [lf]      c___)     U

*/ 

// global variables

let deckId;
let computerScore = 0;
let userScore = 0;
const cardContainer = document.getElementById("cards");
const newDeck = document.getElementById("new-deck");
const drawBtn = document.getElementById("draw");
const remaining  = document.getElementById("remaining");
const winner  = document.getElementById("header");
const computerScoreEl = document.getElementById("computer-score");
const userScoreEl = document.getElementById("user-score");

// handling a new deck 

function handleClick(){
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
      remaining.textContent = `Remaining cards: ${data.remaining}`
      deckId = data.deck_id
      console.log(data)
    }) 
}
  newDeck.addEventListener("click", handleClick)

  //disable btn after cards run out

// Draw

function drawCard() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
  .then(res => res.json())
  .then(data => {
    remaining.textContent = `Remaining cards: ${data.remaining}`
    // console.log(data)

    cardContainer.children[0].innerHTML = `
    <img src= ${data.cards[0].image} class = "card"/>
    `
    cardContainer.children[1].innerHTML = `
    <img src= ${data.cards[1].image} class = "card"/>
    `

      
    const winnerText = determineCardWinner(data.cards[0], data.cards[1])
    header.textContent = winnerText

    if (data.remaining === 0) {
      draw.disabled = true
      if(computerScore > userScore){
        header.text= "The COMPUTER WIN!!!"
      }
      else if(userScore > computerScore){
        header.text= "YOU WIN!!!"
      }
      else{header.textContent = "It's a tie game!"}
  }

  })
 
}
//DisplayCards
  drawBtn.addEventListener("click", drawCard)


 function determineCardWinner(card1, card2) {
  const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]

    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    // console.log("card 1:", card1ValueIndex)
    // console.log("card 2:", card2ValueIndex)
 
    if (card1ValueIndex > card2ValueIndex) {
      computerScore++
      computerScoreEl.textContent = `Computer Score: ${computerScore}`
      return ("Computer Wins!")
    } 
   else if (card1ValueIndex < card2ValueIndex) {
     userScore++
    userScoreEl.textContent = `User  Score: ${userScore}`
     return ("You Win!")
    }
  else {
    return  ("WAR!")}
}


// example of async/ await has the function appear to bw completely synchronous

// async function handleClick() {
//     const response = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
//     const data = await res.json()
//     remainingText.textContent = `Remaining cards: ${data.remaining}`
//     deckId = data.deck_id
//     console.log(deckId)



















// Docs for original Deck of Cards API: https://deckofcardsapi.com/#draw-card
// * BaseUrl you'll use: https://apis.scrimba.com/deckofcards/api/deck/
// * (that will replace the base url of https://deckofcardsapi.com/api/deck/)
// * that you'll see in the deck of cards API docs.