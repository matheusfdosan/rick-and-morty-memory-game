const input = document.querySelector(".login__input")
const button = document.querySelector(".login__button")
const form = document.querySelector(".login__form")

input.addEventListener("input", ({ target }) => {
  if (target.value.length !== 0) {
    button.removeAttribute("disabled")
    return
  }

  button.setAttribute("disabled", "")
})

form.addEventListener("submit", (event) => {
  // Cancelando o recarregamento da página
  event.preventDefault()

  // Colocando o nome do jogador no localSctorage
  const playerName = event.target[0].value
  localStorage.setItem("playerName", playerName)

  // Redirecionando para a página do Jogo
  window.location = "pages/game.html"
})
