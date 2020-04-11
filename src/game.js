'use strict'

class Game {
  constructor () {
    this.player = null
    this.hrTeam = []
    this.projectM = [] // hay que verificar este valor, sino poner 1
    this.gameIsOver = false
    // this.gameIsWon = false
    this.gameScreen = null
    this.canvas = null
    this.ctx = null
    // crear propiedades de img y audio del juego, como poner audio?
  }

  // instantiate the player, set the canvas ,and start the canvas loop
  start () {
    // Save reference to canvas and container, create ctx
    const canvasContainer = document.querySelector('.canvas-container')
    this.canvas = this.gameScreen.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')

    // Save the reference to lives and score elements
    this.livesElement = this.gameScreen.querySelector('.lives.value')

    // Set the canvas dimenisons
    this.containerWidth = canvasContainer.clientWidth
    this.containerHeight = canvasContainer.clientHeight

    this.canvas.width = this.containerWidth
    this.canvas.height = this.containerHeight

    this.player = new Player(this.canvas, 4)

    // Event listener for moving the player
    function handleKeyDown (event) {
      if (event.key === 'ArrowLeft') {
        console.log('LEFT')
        this.player.setDirection('left')
        // aquí irá la img del player que se mueve a la izquierda
      } else if (event.key === 'ArrowRight') {
        console.log('RIGHT')
        this.player.setDirection('right')
      }
      // añadir que se pueda parar? En caso
      // else if (event.keyCode == 32) {
      // this.player.direction = 0;
    // };
    }

    const boundHandleKeyDown = handleKeyDown.bind(this) // tenemos que hacer bind porqué sino cogeremos
    // this del document en lugar que el this del game
    document.addEventListener('keydown', boundHandleKeyDown)

    // Start the canvas requestAnimationFrame loop
    this.startLoop()
  }

  startLoop () {
    const loop = function () {
      // 1. UPDATE THE STATE OF PLAYER AND ENEMIES
      // 1.1 Create new enemies randomly (both HR and ProjectM)
      if (Math.random() > 0.99) {
        const randomHeightPos = this.canvas.height * Math.random()
        const newHrTeam = new HRteam(this.canvas, randomHeightPos, 2)

        this.hrTeam.push(newHrTeam)
      } ;
      if (Math.random() > 0.99) {
        const randomHeightPos = this.canvas.height * Math.random()
        const newProjectM = new ProjectM(this.canvas, randomHeightPos, 2)

        this.projectM.push(newProjectM) // en caso sea 1 no push
      }

      // 1.2. Check if player had hit any enemy
      this.checkCollisons(Math.random() > 0.98)

      // 1.3. Update the player positon
      this.player.handleScreenCollision()
      this.player.updatePosition()

      // 1.4  Move all the enemies
      // 1.5  Check if enemy is off the screen
      const hrTeamOnScreen = this.hrTeam.filter(function (hr) {
        hr.updatePosition()
        const isInsideScreen = hr.isInsideScreen()

        return isInsideScreen // true false
      })

      this.hrTeam = hrTeamOnScreen

      const projectmOnScreen = this.projectM.filter(function (projectm) {
        projectm.updatePosition()
        const isInsideScreen = projectm.isInsideScreen()

        return isInsideScreen // true false
      })

      this.projectM = projectmOnScreen

      // 2. CLEAR THE CANVAS
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      // 3. PAINT THE CANVAS
      // 3.1 Draw player
      this.player.draw()

      // 3.2 Draw all enemies
      this.hrTeam.forEach((hr) => {
        hr.draw()
      })
      this.projectM.forEach((projectm) => {
        projectm.draw()
      })

      // 4. TERMINATE LOOP IF GAME IS OVER
      if (this.gameIsOver === false) {
        requestAnimationFrame(loop) // animation loop
      }

      // 5. UPDATE GAME STATUS
      this.updateGameStats()
    }.bind(this)

    loop() // initial invocation
  }

  checkCollisons () {
    // array method callbacks loose the value of `this`
    // remedy is `thisArg` or using arrow function as a callback
    // this.enemies.forEach( (enemy) => {
    /*
    this.enemies.forEach(function (enemy) {
      if (this.player.didCollide(enemy)) {
        this.player.removeLife()
        console.log('Player lives', this.player.lives)

        // Move the enemy of the screen, to the left
        enemy.x = -1 * enemy.size

        if (this.player.lives <= 0) {
          this.gameOver()
        }
      }
    }, this) // <== thisArg
    */
  }

  /*
  gameOver () {
    this.gameIsOver = true
    endGame(this.score)
  }
*/
  updateGameStats () {
    /*
    this.score++
    this.livesElement.innerHTML = this.player.lives
    this.scoreElement.innerHTML = this.score
    */
  }
}
