import React from 'react';
import '../styles/toolbar.scss'
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import canvasState from "../store/canvasState";
import Circle from "../tools/Circle";
import Line from "../tools/Line";
import Eraser from "../tools/Eraser";


const Toolbar = () => {
    const changeColor = (e) => {
        toolState.setfillColor(e.target.value)
        toolState.setstrokeColor(e.target.value)
    }

    return (
        <div className='toolbar'>
            <button className='toolbar__btn brush' onClick={() => toolState.setTool(new Brush(canvasState.canvas))}></button>
            <button className='toolbar__btn rect' onClick={() => toolState.setTool(new Rect(canvasState.canvas))}></button>
            <button className='toolbar__btn circle' onClick={() => toolState.setTool(new Circle(canvasState.canvas))}></button>
            <button className='toolbar__btn eraser' onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}></button>
            <button className='toolbar__btn line' onClick={() => toolState.setTool(new Line(canvasState.canvas))}></button>

            <input
                type='color' style={{marginLeft:'15px'}}
                onChange={e => changeColor(e)}
            />

            <button className='toolbar__btn undo' onClick={() => canvasState.undo()}></button>
            <button className='toolbar__btn redo' onClick={() => canvasState.redo()}></button>
            <button className='toolbar__btn save'></button>
        </div>
    );
};

export default Toolbar;