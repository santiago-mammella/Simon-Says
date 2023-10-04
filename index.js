/*
  0-instaciar las secuencias en 0
  1-pulsar el boton de inicio
  2-turno de la maquina
    2a- cambiar los textos
    2b- sacar el boton de comenzar
    2c- bloquear al jugador 
    2d- elejir un color al azar
    2e- agregar el color al azar a la secuencia
    2f- mostrar secuencia de la maquina
  3-turno del jugador 
    3a-habilitar al jugador
    3b-cambiar los textos
    3c-el jugador elije un color
    3d-resaltar el color
    3e- si le pego, gana, sino pierde
  4-SI el color coincide con el de la maquina
    4a- la maquina elije un color nuevo dando inicio a un array de colores
    4b- termina el juego
  5- Turno de la maquina -> elije otro color aleatorio
  6-turno del jugador
  7- con arrays vamos a tener q ir comparando la secuencia
*/

let botSequence =[];
let playerSequence = [];

document.querySelector("#start").onclick = startGame

function startGame(){
  handleTurns()
}

function handleTurns(){
  handleBotTurn()
  let PLAYER_DELAY = botSequence.length*1020
  setTimeout(()=>{
    handlePlayerTurn()
  },PLAYER_DELAY)
}

function handleBotTurn(){
  handleInterface("botTurn")
  const $newSquare = selectRandomSquare();
  botSequence.push($newSquare)
  showSequence(botSequence)
} 

function handlePlayerTurn(){
  playerSequence = []
  handleInterface("playerTurn")
  document.querySelectorAll('.square').forEach($square =>{
    $square.onclick = handleUserClick
  })
}

function handleUserClick(event){
  const $newSquare = event.target
  highlightSquare($newSquare)
  playerSequence.push($newSquare)
  handleWin($newSquare)
}

function selectRandomSquare(){
  const $squares = document.querySelectorAll('.square')
  const index = Math.floor(Math.random() * 4)
  return $squares[index]
}

function handleInterface(key){
  if(key === "botTurn"){
    handleHeaderMessage("Our bot is playing...")
    handleButtonView(false)
    blockPlayer()
  }else if ( key ==="playerTurn"){
    handleHeaderMessage("Is your turn")
    handleButtonView(false)
  }else{
    handleHeaderMessage("You failed! Do you want to play again?")
    handleButtonView(true)
    blockPlayer()
  }
}

function blockPlayer(){
  document.querySelectorAll('.square').forEach($square =>{
    $square.onclick = function(){}
  })
}

function handleHeaderMessage(message){
  document.querySelector("#header-message").innerText = message
}

function handleButtonView(state){
  if(state){
    document.querySelector("#start").classList.remove('d-none')
  }else{
    document.querySelector("#start").classList.add('d-none')
  }
}

function showSequence($sequence){
  $sequence.forEach(($square, index) => {
    const BOT_DELAY = index*1000
    setTimeout(function(){
      highlightSquare($square)
      console.log("hola prendi")
    }, BOT_DELAY)
  })
}

function highlightSquare($square){
  $square.classList.add('active')
  setTimeout(function(){
    $square.classList.remove('active')
    console.log("hola apague")
  },500)
}

function handleWin($square){
  const $botSquare = botSequence[playerSequence.length-1]
  if($botSquare !== $square){
    lose()
  } else {
    if(playerSequence.length === botSequence.length){
      setTimeout(function(){
        handleTurns()
      },1000)
    }
  }
}

function lose(){
  handleInterface('endGame')
  restart()
}

function restart(){
  botSequence =[];
  playerSequence = [];
}