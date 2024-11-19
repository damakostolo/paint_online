export default class Tool {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.destroyEvents()
    }

    set fillColor(color){
        this.ctx.fillStyle = color;
    }

    set strokeColor(color){
        this.ctx.strokeStyle = color;
    }

    set lineWidth(size){
        this.ctx.lineWidth = size;
    }

    destroyEvents(){
        this.canvas.onmouseup = null
        this.canvas.onmousedown = null
        this.canvas.onmousemove = null
    }
}