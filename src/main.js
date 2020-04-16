// Creating different views and starting and ending the game

let game
let splashScreen // start game screen element
let gameScreen
let gameOverScreen // game over screen element
let gameWinScreen // game win screen element

// used to create HTML elements
function buildDom (htmlString) {
  const div = document.createElement('div') // temporary container
  div.innerHTML = htmlString

  return div.children[0]
}

// splash screen
function createSplashScreen () {
  splashScreen = buildDom(`
    <main class="main-start">
      <h1>THE DREAMED JOB</h1>
      <img id="splashimg" src="img/programming-office.jpg" alt="cover image">
      <button class= "start-btn">START GAME</button>
      <p>INSTRUCTIONS</p>
      <section class = "instructions">
        <ul>
        <li><button class ="btn-right">&#x25B6</button> = MOVE PLAYER TO THE RIGHT</li>
        <li><button class ="btn-left">&#x25C0</button> = MOVE PLAYER TO THE LEFT</li>
        <li><button class ="btn-space-bar">space bar</button> = PLAYER STOPS</li>
        </ul>
      </section>
    </main>
 `)

  document.body.appendChild(splashScreen)

  const startButton = splashScreen.querySelector('button')
  startButton.addEventListener('click', function () {
    startGame()
  })
}

// game screen
function createGameScreen () {
  gameScreen = buildDom(`
    <main class="game container">
    <header>
      <div class="lives">
        <span class="label">CV'S:</span>
        <span class="value"></span>
      </div>
    </header>
    <div class="canvas-container">
      <canvas></canvas>
    </div>
  </main>
  `)

  document.body.appendChild(gameScreen)
}

function removeScreen () {
  document.body.innerHTML = ''
}

// game over screen
function createGameOverScreen () {
  gameOverScreen = buildDom(`
  <main class="game-over-screen">
    <h1>GAME OVER!</h1>
    <div class="img-game-over">
      <img src="img/woman-text.png" alt="game over it recruiter image">
    </div>
    <div class ="btn-return-container">
      <button class="restartbtn">RESTART</button>
      <button class="homebtn">HOME</button>
    </div>
  </main>
  `)

  var restartButton = gameOverScreen.querySelector('.restartbtn')
  restartButton.addEventListener('click', startGame)

  var homeButton = gameOverScreen.querySelector('.homebtn')
  homeButton.addEventListener('click', backSplash)

  document.body.appendChild(gameOverScreen)
}

function removeGameOverScreen () {
  if (gameOverScreen) {
    gameOverScreen.remove()
  }
}
// game win screen
function createGameWinScreen () {
  gameWinScreen = buildDom(`
  <main class="transition-screen">
    <h1>YOU DID IT!!<br>YOU GOT THE JOB</h1>
    <div class="win">
    <img src="img/win-screen-lego-img.jpg" alt="you win">
    </div>
    <div class ="btn-return2-container">
    <button class="restartbtn2">RESTART</button>
    <button class="homebtn2">HOME</button>
    </div>
  </main>
  `)

  var restartButton = gameWinScreen.querySelector('.restartbtn2')
  restartButton.addEventListener('click', startGame)

  var homeButton = gameWinScreen.querySelector('.homebtn2')
  homeButton.addEventListener('click', backSplash2)

  document.body.appendChild(gameWinScreen)
}

function removeGameWinScreen () {
  if (gameWinScreen) {
    gameWinScreen.remove()
  }
}

// start the game , end the game
function startGame () {
  removeScreen()
  createGameScreen()

  game = new Game()
  game.gameScreen = gameScreen

  // Start the game
  game.start()
}

function endGame () {
  removeScreen()
  // createGameOverScreen()

  if (game.gameIsWon) {
    console.log('YOU ARE A WINNER')
    createGameWinScreen()
  } else {
    console.log('YOU ARE A LOOSER')
    createGameOverScreen()
  }
}

function backSplash () {
  removeGameOverScreen()
  createSplashScreen()
}

function backSplash2 () {
  removeGameWinScreen()
  createSplashScreen()
}

// Run the function   `createSplashScreen` once all the resources are loaded
window.addEventListener('load', createSplashScreen)
