'use strict'
class Player {
  constructor (canvas, lives) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')

    this.lives = lives

    this.size = 90 // cuando tengo la img de mi payer actualizaré este dato
    this.x = 1
    this.y = canvas.height - this.size
    this.direction = 0 //  0 not moving  // -1 moving up   // 1 moving down
    this.speed = 5

    this.playerLeft = this.x
    this.playerRight = this.y + this.size

    this.screenLeft = 0 // x = 0
    this.screenRight = this.canvas.width // - this.size

    // imagen del player
  }

  setDirection (direction) {
    if (direction === 'left') this.direction = -1
    else if (direction === 'right') this.direction = 1
    // añadir stop?
  }

  handleScreenCollision () {
    const { playerRight, screenRight, playerLeft, screenLeft } = this

    // console.log(playerLeftTop, screenLeftTop, playerRightTop, screenRightTop)
    // If the player touched the Top left or right

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

    this.screenLeft = 0 // x = 0
    this.screenRight = this.canvas.width // - this.size
  }

  removeLife () {
    this.lives -= 1
  }

  draw () {
    this.ctx.fillStyle = 'magenta'
    // ctx.fillRect(x, y, width, height)

    this.ctx.fillRect(this.x, this.y, this.size, this.size)
  }

  didCollideHr (hr) {
    // true or false if player hit an enemy
    const playerLeft = this.x
    const playerRight = this.x + this.size
    const playerTop = this.y
    const playerBottom = this.y + this.size

    const hrLeft = hr.x
    const hrRight = hr.x + hr.size
    const hrTop = hr.y
    const hrBottom = hr.y + hr.size

    const crossRight = hrLeft <= playerRight && hrLeft >= playerLeft

    const crossLeft = hrRight >= playerLeft && hrRight <= playerRight

    const crossTop = hrBottom >= playerTop && hrBottom >= playerBottom

    const crossBottom = hrTop <= playerBottom && hrTop >= playerTop

    if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
      return true
    } else {
      return false
    }
  }

  // porqué tengo que crear 2 didCollide functions? si quito 1 me da error...
  didCollideProjectM (projectm) {
    // true or false if player hit an enemy
    const playerLeft = this.x
    const playerRight = this.x + this.size
    const playerTop = this.y
    const playerBottom = this.y + this.size

    const projectmLeft = projectm.x
    const projectmRight = projectm.x + projectm.size
    const projectmTop = projectm.y
    const projectmBottom = projectm.y + projectm.size

    const crossRight = projectmLeft <= playerRight && projectmLeft >= playerLeft

    const crossLeft = projectmRight >= playerLeft && projectmRight <= playerRight

    const crossTop = projectmBottom >= playerTop && projectmBottom <= playerBottom

    const crossBottom = projectmTop <= playerBottom && projectmTop >= playerTop

    if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
      return true
    } else {
      return false
    }
  }
}
