import React, {useEffect, useRef, useState} from 'react';
import '../styles/canvas.scss'
import {observer} from "mobx-react-lite";
import canvasState from '../store/canvasState';
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useParams} from "react-router-dom";
import Rect from "../tools/Rect";
import axios from "axios";

const Canvas = observer(()=> {

    const {id} = useParams();

    const [modal, setModal] = React.useState(true);

    const canvasRef = useRef()
    const userRef = useRef()

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        toolState.setTool(new Brush(canvasRef.current));
        let ctx = canvasRef.current.getContext('2d')
        axios.get(`http://localhost:5000/image?id=${id}`)
            .then(response => {
                const img = new Image()
                img.src = response.data
                img.onload = () => {
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                    ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
                }
            })
    } ,[])


    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket(`ws://localhost:5000/`);
            canvasState.setSocket(socket)
            canvasState.setSessionId(id)
            toolState.setTool(new Brush(canvasRef.current, socket, id))
            socket.onopen = () => {
                console.log('Подключение установлено')
                socket.send(JSON.stringify({
                    id: id,
                    username: canvasState.username,
                    method: "connection"
                }))
            }
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data)
                switch (msg.method) {
                    case "connection":
                        console.log(`пользователь ${msg.username} присоединился`)
                        break
                    case "draw":
                        drawHandler(msg)
                        break
                }
            }
        }
    }, [canvasState.username])


    const mouseDownHendler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
        axios.post(`http://localhost:5000/image?id=${id}`, {img: canvasRef.current.toDataURL()})
            .then(response => console.log(response.data))
    }

    const connectionHandler = () => {
        canvasState.setUsername(userRef.current.value)
        setModal(false)
    }

    const drawHandler = (msg) => {
        const figure = msg.figure
        const ctx = canvasRef.current.getContext('2d')
        switch (figure.type) {
            case "brush":
                Brush.draw(ctx, figure.x, figure.y)
                break
            case "rect":
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
                break
            case "finish":
                ctx.beginPath()
                break
        }
    }

    const [show, setShow] = useState(false);

    return (
        <div className="canvas">

            <Modal show={modal} onHide={() => {}}>
                <Modal.Header closeButton>
                    <Modal.Title>Укажите ваше имя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type={"text"} placeholder={'Ivan6776'} ref={userRef} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => connectionHandler()}>
                        Войти
                    </Button>
                </Modal.Footer>


            </Modal>
            <canvas onMouseDown={() => mouseDownHendler()} ref={canvasRef} width={600} height={400}></canvas>
        </div>
    );
});

export default Canvas;