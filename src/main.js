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
      <h1>The Dreamed job</h1>
      <img src="./img/3036.jpg" alt="cover image">
      <a href="http://www.freepik.com">Designed by vectorpocket / Freepik</a>
      <button>Start Game</button>
      <section class = "instructions">
      <p>INSTRUCTIONS</p>
      <ul>
      <li><button class ="right-btn">&#x25B6</button> = move player to the right</li>
      <li><button class ="right-btn">&#x25C0</button> = move player to the left</li>
      //añadir stop?
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
        <span class="label">CV's:</span>
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
function createGameOverScreen (score) {
  gameOverScreen = buildDom(`
  <main>
    <h1>Game over</h1>
    <p>Your score: <span> ${score} </span></p>
    <button>Restart</button>
  </main>
  `)

  var restartButton = gameOverScreen.querySelector('button')
  restartButton.addEventListener('click', startGame)

  document.body.appendChild(gameOverScreen)
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

function endGame (score) {
  removeScreen()
  createGameOverScreen(score)
}

// Run the function   `createSplashScreen` once all the resources are loaded
window.addEventListener('load', createSplashScreen)
