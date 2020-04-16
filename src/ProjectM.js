'use strict'

class ProjectM {
  constructor (canvas, x, speed) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')

    this.size = 100
    this.y = 0 // this.canvas.height + this.size
    this.x = x
    this.speed = speed
    this.imageProjectM = new Image()
    this.imageProjectM.src = 'img/project-manager.png'
  }

  draw () {
    this.ctx.drawImage(this.imageProjectM, this.x, this.y, this.size, 140)
  }

  updatePosition () {
    // y axis porque en mi caso se mueven de arriba a bajo por lo que sumamos en lugar de restar
    this.y = this.y + this.speed
  }

  isInsideScreen () {
    if (this.y + this.size > 0 && this.x + this.size < this.canvas.width) {
      return true
    } else {
      return false
    }
  }
}
