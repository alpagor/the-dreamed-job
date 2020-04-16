'use strict'

class HRteam {
  constructor (canvas, x, speed) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')

    this.size = 105
    this.y = 0
    this.x = x
    this.speed = speed
    this.imageHR = new Image()
    this.imageHR.src = 'img/HR-creepy-guy2.png'
  }

  draw () {
    this.ctx.drawImage(this.imageHR, this.x, this.y, this.size, 135)
  }

  updatePosition () {
    this.y = this.y + this.speed
  }

  isInsideScreen () {
    if (this.y + this.size < this.canvas.height) {
      return true
    } else {
      return false
    }
  }
}
