'use strict'

class Game {
  constructor () {
    this.player = null
    this.hrTeam = []
    this.projectM = []
    this.gameIsOver = false
    this.gameIsWon = false
    this.gameScreen = null
    this.canvas = null
    this.ctx = null
    this.nextIndex = 0 // variable the holds number for the index of the questions array
    this.questions = [{ // array of all questions
      qa:
        'CSS Margin-top and margin-bottom do not have an effect on an inline element. (a) True (b) False',
      answer: 'b'
    },
    {
      qa:
        'getElementbyId return: (a) 1 single element (b) an HTML collection (c) a Nodelist',
      answer: 'a'
    },
    {
      qa:
        'Which is not an array method? (a) .map (b) .get (c) .filter (d) .reduce',
      answer: 'b'
    }]
  }

  // instantiate the player, set the canvas ,and start the canvas loop
  start () {
    // Save reference to canvas and container, create ctx
    const canvasContainer = document.querySelector('.canvas-container')
    this.canvas = this.gameScreen.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')

    // Save the reference to lives and score elements
    this.livesElement = this.gameScreen.querySelector('.lives .value')

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
      } else if (event.keyCode === 32) {
        this.player.direction = 0
      }
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
      if (Math.random() > 0.98) {
        const randomWidthPos = (this.canvas.width - 100) * Math.random()
        const newHrTeam = new HRteam(this.canvas, randomWidthPos, 6)

        this.hrTeam.push(newHrTeam)
      } ;
      if (Math.random() > 0.985) {
        const randomWidthPos = (this.canvas.width - 105) * Math.random()
        const newProjectM = new ProjectM(this.canvas, randomWidthPos, 2)

        if (this.projectM.length < 1) {
          this.projectM.push(newProjectM) // en caso sea 1 no push cuando salga de la pantalla lo vuelve a poner
        }
      }

      // 1.2. Check if player had hit any enemy
      this.checkCollisons()

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
        console.log(isInsideScreen)
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
      if (this.gameIsOver === false && this.gameIsWon === false) {
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
    // checkCollisions with hrTeam enemy

    this.hrTeam.forEach(function (hr) {
      if (this.player.didCollide(hr)) {
        this.player.removeLife()

        // Move the enemy of the screen, to the bottom
        hr.y = 0 - hr.size

        if (this.player.lives <= 0) {
          this.gameOver()
        }
      }
    }, this) // <== thisArg

    // check collision with projectM "enemy"
    this.projectM.forEach(function (projectm) {
      if (this.player.didCollide(projectm)) {
        // this.player.removeLife()
        // console.log('Player lives', this.player.lives)
        this.questionPrompt()
        // Move the enemy of the screen, to the bottom
        projectm.y = 0 - projectm.size

        if (this.player.lives <= 0) {
          this.gameOver()
        }
      }
    }, this) // <== thisArg
  }

  // gameOver

  gameOver () {
    this.gameIsOver = true
    endGame()
  }

  // gameWin

  gameWin () {
    this.gameIsWon = true
    endGame()
  }

  // prueba crear función para el prompt

  questionPrompt () {
    // const question = prompt('What does HTML stand for?(a) Hyper type marked language (b) Hyper text markup language (c) Hyped terrain mock language (d) Hyper typeface main loop')

    const theQuestion = this.questions[this.nextIndex].qa
    const theAnswer = this.questions[this.nextIndex].answer
    const theInput = prompt(theQuestion)
    if (theInput) {
      if (theAnswer === theInput.toLowerCase()) {
        if (this.nextIndex !== this.questions.length - 1) {
          this.nextIndex += 1
          this.projectM.pop() // limpiamos el array porqué despues del prompt el projectM aparece en el mismo lugar
          this.hrTeam.length = 0
          // this.startLoop() si lo dejo en cada iteración me aumenta la velocidad...como si guardar en cache la misma y le sumara la nueva
          // this.startLoop()las 3 preguntas al mismo pm si no limpiamos los arrays
        } else if (this.nextIndex === this.questions.length - 1) {
          console.log('you got the job!')
          return this.gameWin()
        }
      } else {
        return this.gameOver()
      }
    }
  }

  updateGameStats () {
    this.livesElement.innerHTML = this.player.lives
  }
}
