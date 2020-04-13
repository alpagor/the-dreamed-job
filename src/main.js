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
      <li><button class ="right-btn">space bar</button> = player stops</li>
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
function createGameOverScreen () {
  gameOverScreen = buildDom(`
  <main>
    <h1>Game over</h1>
    <p>Sorry, we have selected the candidate whom we believe most closely matches the job requirements of the position.<br>We do appreciate you taking the time to interview with us and encourage you to apply for other openings at the company in the future.</p> 
    <div class ="btn-return-container">
    <button class="restartbtn">Restart</button>
    <button class="homebtn">Home</button>
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
    <h1><img src="./img/Keep-Calm-Because-You-Got-The-Job-600x700.png" alt="you win"></h1>
    <div class ="btn-return2-container">
    <button class="restartbtn2">Restart</button>
    <button class="homebtn2">Home</button>
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
