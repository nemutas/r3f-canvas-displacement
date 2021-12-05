import React, { useEffect, useRef, VFC } from 'react';
import { css } from '@emotion/css';
import { Button, Slider, Typography } from '@mui/material';

export const Drawer: VFC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	let darkness = 1
	let lineWidth = 10
	let mouseDown = false
	let start = { x: 0, y: 0 }
	let end = { x: 0, y: 0 }
	const ratio = { w: 300 / 300, h: 300 / 300 } // 解像度 / Canvas Size(pixel)

	const clearCanvas = () => {
		const ctx = canvasRef.current!.getContext('2d')!
		ctx.fillStyle = '#000'
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
	}

	useEffect(() => {
		clearCanvas()
	}, [])

	const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		mouseDown = true
		const rect = canvasRef.current!.getBoundingClientRect()
		start = { x: e.clientX - rect.x, y: e.clientY - rect.y }
		end = { x: e.clientX - rect.x, y: e.clientY - rect.y }
	}

	const handleMouseUp = () => {
		mouseDown = false
	}

	const handleMouseLeave = () => {
		mouseDown = false
	}

	const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		if (mouseDown) {
			const ctx = canvasRef.current!.getContext('2d')!
			const rect = canvasRef.current!.getBoundingClientRect()

			start = { x: end.x, y: end.y }
			end = { x: e.clientX - rect.x, y: e.clientY - rect.y }

			const dark = 255 * darkness

			// Draw our path
			ctx.beginPath()
			ctx.moveTo(start.x * ratio.w, start.y * ratio.h)
			ctx.lineTo(end.x * ratio.w, end.y * ratio.h)
			ctx.strokeStyle = `rgb(${dark}, ${dark}, ${dark})`
			ctx.lineWidth = lineWidth
			ctx.lineCap = 'round'
			ctx.stroke()
			ctx.closePath()
		}
	}

	const handleClearClick = () => {
		clearCanvas()
	}

	const handleDarknessChange = (e: Event, v: number | number[]) => {
		darkness = v as number
	}

	const handleLineWidthChange = (e: Event, v: number | number[]) => {
		lineWidth = v as number
	}

	return (
		<div className={styles.container}>
			{/* canvas */}
			<canvas
				id="drawer"
				ref={canvasRef}
				className={styles.canvas}
				width={300}
				height={300}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
			/>
			{/* controls */}
			<div className={styles.sliderContainer}>
				<Typography component="div">Darkness</Typography>
				<Slider
					size="small"
					color="secondary"
					valueLabelDisplay="auto"
					min={0}
					max={1}
					step={0.1}
					defaultValue={1}
					onChange={handleDarknessChange}
				/>
			</div>
			<div className={styles.sliderContainer}>
				<Typography component="div">LineWidth</Typography>
				<Slider
					size="small"
					color="secondary"
					valueLabelDisplay="auto"
					min={5}
					max={20}
					step={1}
					defaultValue={10}
					onChange={handleLineWidthChange}
				/>
			</div>
			<Button variant="outlined" color="secondary" fullWidth onClick={handleClearClick}>
				Clear
			</Button>
		</div>
	)
}

// ==============================================
const styles = {
	container: css`
		position: relative;
		padding: 20px;
		background-color: rgba(0, 109, 176, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 10px;
		display: grid;
		grid-template-rows: auto auto auto auto;
		grid-gap: 10px;
	`,
	canvas: css`
		width: 300px;
		height: 300px;
	`,
	sliderContainer: css`
		display: flex;
		justify-content: center;
		align-items: center;
		grid-gap: 10px;
		color: #fff;
	`
}
