import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { MENU_ITEMS } from "@/constants";
import { actionItemClick } from "@/slice/menuSlice";

import { socket } from "@/socket";

const Board = () => {
    const dispatch = useDispatch();
    const canvasRef = useRef(null);
    const drawHistory = useRef([]);
    const historyPointer = useRef(0);
    const shouldDraw = useRef(false);


    const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);

    const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
            const URL = canvas.toDataURL();
            const anchor = document.createElement('a');
            anchor.href = URL;
            anchor.download = 'sketch.png';
            anchor.click();
        }
        else if (actionMenuItem === MENU_ITEMS.UNDO || actionMenuItem === MENU_ITEMS.REDO) {
            if (historyPointer.current.length === 0) return;
            if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO) {
                historyPointer.current -= 1;

                const imageData = drawHistory.current[historyPointer.current];
                context.putImageData(imageData, 0, 0);
            }
            if (actionMenuItem === MENU_ITEMS.REDO && historyPointer.current < drawHistory.current.length - 1) {
                historyPointer.current += 1;

                const imageData = drawHistory.current[historyPointer.current];
                context.putImageData(imageData, 0, 0);
            }


        }

        dispatch(actionItemClick(null));
    }, [actionMenuItem, dispatch]);


    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const changeBrushConfig = (color, size) => {
            context.strokeStyle = color;
            context.lineWidth = size;
        }

        const handleChangeConfig = (config) => {
            console.log("config", config);
            changeBrushConfig(config.color, config.size);
        }
        changeBrushConfig(color, size);
        socket.on('changeConfig', handleChangeConfig);

        return () => {
            socket.off('changeConfig', handleChangeConfig);
        }
    }, [color, size]);

    // before paining
    useLayoutEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // when mounting
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Making canvas white
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);

        const beginPath = (x, y) => {
            context.beginPath();
            context.moveTo(x, y);
        }
        const drawLine = (x, y) => {
            context.lineTo(x, y);
            context.stroke();
        }

        const handleMouseDown = (e) => {
            shouldDraw.current = true;
            beginPath(e.clientX, e.clientY);
            socket.emit('beginPath', { x: e.clientX, y: e.clientY })
        }

        const handleMouseMove = (e) => {
            if (!shouldDraw.current) return;

            drawLine(e.clientX, e.clientY);
            socket.emit('drawLine', { x: e.clientX, y: e.clientY })
        }

        const handleMouseUp = (e) => {
            shouldDraw.current = false;
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            drawHistory.current.push(imageData);
            historyPointer.current = drawHistory.current.length - 1;
        }


        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);

        const handleBeginPath = (path) => {
            beginPath(path.x, path.y);
        }

        const handleDrawLine = (path) => {
            drawLine(path.x, path.y);
        }

        socket.on('beginPath', handleBeginPath);
        socket.on('drawLine', handleDrawLine);


        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);

            socket.off('beginPath', handleBeginPath);
            socket.off('drawLine', handleDrawLine);
        }
    }, [])

    return (
        <canvas ref={canvasRef}></canvas>
    )
}

export default Board