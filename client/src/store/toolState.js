import {makeAutoObservable} from "mobx";

class ToolState {
    constructor() {
        makeAutoObservable(this);
    }

    setTool(tool){
        this.tools = tool;
    }

    setfillColor(color){
        this.tools.fillColor = color;
    }

    setstrokeColor(color){
        this.tools.strokeColor = color;
    }

    setlineWidth(size){
        this.tools.lineWidth = size;
    }






}

export default new ToolState();