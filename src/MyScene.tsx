import { useRef, useEffect } from "react";
import * as React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function MyScene() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const loader = new GLTFLoader();
	useEffect(() => {
		if (!canvasRef.current) return;

		const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(0x000000); // set background color to white

		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			1.1,
			1000
		);

		// Set camera position to top of the plane
		// better visibility when reloaded
		camera.position.set(30, 30, 30);

		// Set camera orientation to look downwards
		camera.lookAt(new THREE.Vector3(0, 0, 0));

		// const scene = new THREE.Scene();
		// create plane

		loader.load("../blender files/waterfall.glb", (gltf) => {
			const scene = gltf.scene;
			// Do something with the loaded scene
			// create box
			// add orbit controls
			const light = new THREE.DirectionalLight(0xffffff, 2.5);
			light.position.set(2, 1, 2); // Set the light position
			scene.add(light);

			const controls = new OrbitControls(camera, canvasRef.current);

			controls.enableDamping = true;
			controls.dampingFactor = 0.05;
			const animate = () => {
				requestAnimationFrame(animate);
				renderer.render(scene, camera);
			};

			animate();

			return () => {
				renderer.dispose();
			};
		});
	}, []);

	return <canvas ref={canvasRef} />;
}

export default MyScene;
