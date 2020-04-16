'use strict'

class ProjectM {
  constructor (canvas, x, speed) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')

    this.size = 100
    this.y = 0
    this.x = x
    this.speed = speed
    this.imageProjectM = new Image()
    this.imageProjectM.src = 'img/project-manager.png'
  }

  draw () {
    this.ctx.drawImage(this.imageProjectM, this.x, this.y, this.size, 140)
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
