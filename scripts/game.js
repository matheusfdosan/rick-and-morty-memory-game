const grid = document.querySelector(".grid")
const spanPlayer = document.querySelector(".player-name")
const spanTimer = document.querySelector(".counter")
let time = 0

const characters = [
  "beth",
  "jerry",
  "jessica",
  "meeseeks",
  "morty",
  "pessoa-passaro",
  "pickle-rick",
  "rick",
  "scroopy",
  "summer",
]

let firstCard = ""
let secondCard = ""

function createCard(character) {
  const card = createElement("div", "card")
  const front = createElement("div", "face front")
  const back = createElement("div", "face back")

  front.style.backgroundImage = `url(../images/${character}.png)`
  card.setAttribute("data-character", character)

  card.appendChild(front)
  card.appendChild(back)

  card.addEventListener("click", revelCard)

  return card
}

function createElement(tag, className) {
  const element = document.createElement(tag)
  element.className = className
  return element
}

function revelCard({ target }) {
  if (target.offsetParent.classList.contains("reveal-card")) {
    return
  }

  if (firstCard === "") {
    target.offsetParent.classList.add("reveal-card")
    firstCard = target.offsetParent
  } else if (secondCard === "") {
    target.offsetParent.classList.add("reveal-card")
    secondCard = target.offsetParent

    checkCards()
  }
}

function checkCards() {
  const firstCharacter = firstCard.getAttribute("data-character")
  const secondCharacter = secondCard.getAttribute("data-character")

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add("disable-card")
    secondCard.firstChild.classList.add("disable-card")

    firstCard = ""
    secondCard = ""

    checkEndGame()
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card")
      secondCard.classList.remove("reveal-card")

      firstCard = ""
      secondCard = ""
    }, 1000)
  }
}

function checkEndGame() {
  const disabledCards = document.querySelectorAll(".disable-card")

  if (disabledCards.length === 20) {
    const endGameModal = document.querySelector(".end-game-modal")
    
    endGameModal.classList.add("active")
    
    endGameModal.textContent = `Congratulations ${spanPlayer.textContent}, your time was ${spanTimer.textContent} seconds`

    clearInterval(this.loop)
  }
}

function loadGame() {
  const duplicateCharacter = [...characters, ...characters]

  const shuffledArray = duplicateCharacter.sort(() => Math.random() - 0.5)

  shuffledArray.forEach((character) => {
    const card = createCard(character)
    grid.appendChild(card)
  })
}

function startTimer() {
  this.loop = setInterval(() => {
    spanTimer.textContent = time++
  }, 1000)
}

window.onload = () => {
  spanPlayer.textContent = localStorage.getItem("playerName")

  startTimer()

  loadGame()
}
