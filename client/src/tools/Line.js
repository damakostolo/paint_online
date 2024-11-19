import Tool from "./Tool.js";


export default class Line extends Tool{
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
            let currentY = e.pageY - e.target.offsetTop;

            this.draw(this.startX, this.startY , currentX , currentY)
        }
    }

    draw(startX , startY ,currentX , currentY){
        const img = new Image();
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0 , 0 , this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath()
            this.ctx.moveTo(startX, startY);
            this.ctx.lineTo( currentX , currentY);
            this.ctx.stroke();
        }

    }
}