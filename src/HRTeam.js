'use strict'

class HRteam {
  constructor (canvas, x, speed) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')

    this.size = 95 // actualizar con las medidas de mi HR enemies
    this.y = 0 // this.canvas.height + this.size
    this.x = x
    this.speed = speed
    this.imageHR = new Image()
    this.imageHR.src = '../img/hr-guy.png'
  }

  draw () {
    // this.ctx.fillStyle = 'blue' // quitar esto luego y substituir con la img del HR
    // this.ctx.fillRect(this.x, this.y, this.size, this.size)
    this.ctx.drawImage(this.imageHR, this.x, this.y, this.size, 140)
  }

  updatePosition () {
    // y axis porque en mi caso se mueven de arriba a bajo por lo que sumamos en lugar de restar
    this.y = this.y + this.speed
  }

  isInsideScreen () {
    const hrTop = this.y + this.size
    return hrTop < this.canvas.height
  }

  isOutsideScreen () {
    const hrTop = this.y + this.size
    return hrTop > 0
  }
}
