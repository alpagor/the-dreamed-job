'use strict'

class HRteam {
  constructor (canvas, x, speed) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')

    this.size = 105
    this.y = 0 // this.canvas.height + this.size
    this.x = x
    this.speed = speed
    this.imageHR = new Image()
    this.imageHR.src = 'img/HR-creepy-guy2.png'
  }

  draw () {
    this.ctx.drawImage(this.imageHR, this.x, this.y, this.size, 135)
  }

  updatePosition () {
    // y axis porque en mi caso se mueven de arriba a bajo por lo que sumamos en lugar de restar
    this.y = this.y + this.speed
  }

  isInsideScreen () {
    if (this.y + this.size > 0 && this.x + this.size < this.canvas.width) {
      return true
    }
  }
}
