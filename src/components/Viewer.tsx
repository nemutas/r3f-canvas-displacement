import { useControls } from 'leva';
import React, { useEffect, useRef, VFC } from 'react';
import * as THREE from 'three';
import { OrbitControls, Plane, Stats } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';

export const Viewer: VFC = () => {
	return (
		<Canvas
			camera={{
				position: [0, 20, 5],
				fov: 50,
				aspect: window.innerWidth / window.innerHeight,
				near: 0.1,
				far: 2000
			}}
			dpr={window.devicePixelRatio}
			shadows>
			{/* canvas color */}
			<color attach="background" args={['#1e1e1e']} />
			{/* fps */}
			<Stats />
			{/* camera controller */}
			<OrbitControls attach="orbitControls" />
			{/* lights */}
			<ambientLight intensity={0.1} />
			<directionalLight
				position={[10, 10, 10]}
				intensity={1}
				castShadow
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
				shadow-camera-near={0.1}
				shadow-camera-far={40}
				shadow-camera-top={10}
				shadow-camera-bottom={-10}
				shadow-camera-left={-15}
				shadow-camera-right={15}
				shadow-bias={-0.003}
			/>
			{/* objects */}
			<TexturedPlane />
			{/* helper */}
			{/* <axesHelper /> */}
		</Canvas>
	)
}

const TexturedPlane: VFC = () => {
	const matRef = useRef<THREE.MeshPhongMaterial>(null)
	const textureRef = useRef<THREE.Texture>()

	const datas = useControls({
		color: '#2694ab',
		subdivide: {
			value: 300,
			min: 50,
			max: 500,
			step: 10
		},
		displacementScale: {
			value: 5,
			min: 0.1,
			max: 5,
			step: 0.1
		},
		wireframe: true,
		shadow: false
	})

	useEffect(() => {
		const drawer = document.getElementById('drawer')
		if (drawer) {
			const canvas = drawer as HTMLCanvasElement
			const texture = new THREE.Texture(canvas)
			texture.minFilter = THREE.LinearFilter
			texture.magFilter = THREE.LinearFilter
			matRef.current!.displacementMap = texture
			textureRef.current = texture
		}
	}, [])

	useFrame(() => {
		if (textureRef.current) {
			textureRef.current.needsUpdate = true
		}
	})

	return (
		<Plane
			rotation={[-Math.PI / 2, 0, 0]}
			args={[20, 20, datas.subdivide, datas.subdivide]}
			castShadow={datas.shadow}
			receiveShadow>
			<meshPhongMaterial ref={matRef} {...datas} side={THREE.DoubleSide} />
		</Plane>
	)
}
