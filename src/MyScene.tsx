import { useRef, useEffect } from "react";
import * as React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

function MyScene() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const loader = new GLTFLoader();
	useEffect(() => {
		if (!canvasRef.current) return;

		const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(0x00000); // set background color to white

		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			1.1,
			1000
		);
		camera.position.z = 5;

		// const scene = new THREE.Scene();
		// create plane

		loader.load(
			"../blender files/scene.glb",
			(gltf) => {
				const scene = gltf.scene;
				// Do something with the loaded scene
				// create box
				// add orbit controls
				const light = new THREE.DirectionalLight(0xffffff, 0.3);
				light.position.set(10, 10, 10); // Set the light position
				scene.add(light);
				const controls = new OrbitControls(camera, canvasRef.current);
				controls.enableDamping = true;
				controls.dampingFactor = 0.05;
				const animate = () => {
					requestAnimationFrame(animate);
					renderer.render(scene, camera);
				};
				const width = 100;
				const height = 100;
				const intensity = 3;
				const rectLight = new THREE.RectAreaLight(
					0xffffff,
					intensity,
					width,
					height
				);
				rectLight.position.set(0, 50, 0);
				rectLight.lookAt(0, 0, 0);
				// scene.add(rectLight);

				const rectLightHelper = new RectAreaLightHelper(rectLight);
				// rectLight.add(rectLightHelper);
				const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
				scene.add(ambientLight);
				animate();

				return () => {
					renderer.dispose();
				};
			},
			undefined,
			(error) => {
				console.error(error);
			}
		);
	}, []);

	return <canvas ref={canvasRef} />;
}

export default MyScene;
