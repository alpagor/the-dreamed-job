'use strict'

class ProjectM {
  constructor (canvas, x, speed) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')

    this.size = 20 // actualizar con las medidas de mi HR enemies
    this.y = 0 // this.canvas.height + this.size
    this.x = x
    this.speed = speed
    // añadir img de HRteam this.imageHR = new Image ();
  }

  draw () {
    // aquí va la img del HRteam
    this.ctx.fillStyle = 'red' // quitar esto luego y substituir con la img del HR
    this.ctx.fillRect(this.x, this.y, this.size, this.size)
    // Modificar esto quitado el fillRecct = this.ctx.drawImage(this.imageHR, this.x, this.y, this.size, this.size);
  }

  updatePosition () {
    // y axis porque en mi caso se mueven de arriba a bajo por lo que sumamos en lugar de restar
    this.y = this.y + this.speed
  }

  isInsideScreen () {
    const projectTop = this.y + this.size

    return projectTop < this.canvas.height
  }

  isOutsideScreen () {
    const projectTop = this.y + this.size
    return projectTop > 0
  }
}
