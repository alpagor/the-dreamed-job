'use strict'
class Player {
  constructor (canvas, lives) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')

    this.lives = lives

    this.size = 97
    this.x = 1
    this.y = canvas.height - 140
    this.direction = 0 //  0 not moving  // -1 moving up   // 1 moving down
    this.speed = 5

    this.playerLeft = this.x
    this.playerRight = this.y + this.size

    this.screenLeft = 0
    this.screenRight = this.canvas.width

    this.imagePlayer = new Image()
    this.imagePlayer.src = 'img/player.png'
    this.imagePlayerR = new Image()
    this.imagePlayerR.src = 'img/player-right.png'
    this.imagePlayerL = new Image()
    this.imagePlayerL.src = 'img/player-left-2.png'
    this.imageFront = this.imagePlayer

    this.soundHr = new Audio('audio/Doh.mp3')
  }

  setDirection (direction) {
    if (direction === 'left') this.direction = -1
    else if (direction === 'right') this.direction = 1
  }

  handleScreenCollision () {
    const { playerRight, screenRight, playerLeft, screenLeft } = this

    if (playerRight >= screenRight) {
      this.setDirection('left')
    } else if (playerLeft <= screenLeft) {
      this.setDirection('right')
    }
  }

  updatePosition () {
    // update the player position
    this.x = this.x + this.direction * this.speed

    this.playerLeft = this.x
    this.playerRight = this.x + this.size

    this.screenLeft = 0
    this.screenRight = this.canvas.width
  }

  removeLife () {
    this.lives -= 1
    this.soundHr.play()

    this.soundHr.volume = 0.1
  }

  draw () {
    switch (this.direction) {
      case 1:
        this.imageFront = this.imagePlayerR

        break
      case -1:
        this.imageFront = this.imagePlayerL

        break
      default:
        this.imageFront = this.imagePlayer
        break
    }
    this.ctx.drawImage(this.imageFront, this.x, this.y, this.size, 140)
  }

  didCollide (obj) {
    // true or false if player hit an enemy
    const playerLeft = this.x
    const playerRight = this.x + this.size
    const playerTop = this.y
    const playerBottom = this.y + this.size

    const objLeft = obj.x
    const objRight = obj.x + obj.size
    const objTop = obj.y
    const objBottom = obj.y + obj.size

    const crossRight = objLeft <= playerRight && objLeft >= playerLeft

    const crossLeft = objRight >= playerLeft && objRight <= playerRight

    const crossTop = objBottom >= playerTop && objBottom <= playerBottom

    const crossBottom = objTop <= playerBottom && objTop >= playerTop

    const inside = (playerLeft >= objLeft && playerLeft <= objRight) && (playerRight >= objLeft && playerRight <= objRight)

    if ((crossLeft || crossRight || inside) && (crossTop || crossBottom)) {
      return true
    } else {
      return false
    }
  }
}
