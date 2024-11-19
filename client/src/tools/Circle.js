import Tool from "./Tool.js";


export default class Circle extends Tool{
    constructor(canvas) {
        super(canvas);
        this.listen()
    }

    listen(){
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmousemove =this.mouseMoveHandler.bind(this);
    }

    mouseUpHandler(e){
        this.mouseDown = false
    }
    mouseDownHandler(e){
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(e.pageX - e.target.offsetLeft , e.pageY - e.target.offsetTop)
        this.startX = e.pageX - e.target.offsetLeft
        this.startY = e.pageY - e.target.offsetTop
        this.saved = this.canvas.toDataURL()
    }
    mouseMoveHandler(e){
        if(this.mouseDown){
            let currentX = e.pageX - e.target.offsetLeft ;

            this.draw(this.startX, this.startY ,currentX , 0)
        }
    }

    draw(startX , startY, radius ,startAngel){
        const img = new Image();
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0 , 0 , this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath()
            this.ctx.arc( startX , startY, radius ,startAngel ,2*Math.PI , false);
            this.ctx.stroke();
        }

    }
}