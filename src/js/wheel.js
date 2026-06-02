// =============================================
// MAHORAGA WHEEL SCENE — Hero canvas
// =============================================
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let wheelScene, wheelCamera, wheelRenderer, wheelModel, wheelMixer;
let scrollWheelSpeed = 0;

export function initWheelScene() {
  const wheelCanvas = document.getElementById("wheel-canvas");
  wheelScene = new THREE.Scene();

  wheelCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  wheelCamera.position.set(0, 0, 4);

  wheelRenderer = new THREE.WebGLRenderer({
    canvas: wheelCanvas,
    alpha: true,
    antialias: true,
  });
  wheelRenderer.setPixelRatio(window.devicePixelRatio);
  wheelRenderer.setSize(
    wheelCanvas.parentElement.clientWidth,
    wheelCanvas.parentElement.clientHeight,
  );

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  wheelScene.add(ambientLight);

  const redLight = new THREE.PointLight(0xcc0000, 3, 10);
  redLight.position.set(2, 2, 2);
  wheelScene.add(redLight);

  const redLight2 = new THREE.PointLight(0xff1a1a, 2, 8);
  redLight2.position.set(-2, -1, 1);
  wheelScene.add(redLight2);

  const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
  rimLight.position.set(0, 5, -3);
  wheelScene.add(rimLight);

  // Load GLB model
  const loader = new GLTFLoader();
  loader.load(
    "",
    (gltf) => {
      wheelModel = gltf.scene;

      const box = new THREE.Box3().setFromObject(wheelModel);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.5 / maxDim;

      wheelModel.position.sub(center.multiplyScalar(scale));
      wheelModel.scale.setScalar(scale);

      wheelModel.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0x1a0000,
            emissive: 0xcc0000,
            emissiveIntensity: 0.3,
            metalness: 0.8,
            roughness: 0.2,
          });
        }
      });

      wheelScene.add(wheelModel);

      if (gltf.animations && gltf.animations.length > 0) {
        wheelMixer = new THREE.AnimationMixer(wheelModel);
        const action = wheelMixer.clipAction(gltf.animations[0]);
        action.play();
      }
    },
    undefined,
    (error) => {
      console.warn("Model not loaded yet:", error);
      createFallbackWheel();
    },
  );

  // Scroll speed boost
  window.addEventListener("scroll", () => {
    scrollWheelSpeed = 0.05;
    setTimeout(() => {
      scrollWheelSpeed = 0;
    }, 300);
  });
}

function createFallbackWheel() {
  const geometry = new THREE.TorusGeometry(1.5, 0.08, 16, 100);
  const material = new THREE.MeshStandardMaterial({
    color: 0xcc0000,
    emissive: 0xcc0000,
    emissiveIntensity: 0.5,
    metalness: 0.9,
    roughness: 0.1,
  });
  wheelModel = new THREE.Mesh(geometry, material);

  const spoke1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 3, 8),
    material,
  );
  const spoke2 = spoke1.clone();
  const spoke3 = spoke1.clone();
  const spoke4 = spoke1.clone();
  spoke2.rotation.z = Math.PI / 2;
  spoke3.rotation.z = Math.PI / 4;
  spoke4.rotation.z = -Math.PI / 4;

  // wheelModel.add(spoke1, spoke2, spoke3, spoke4);
  // wheelScene.add(wheelModel);
}

export function animateWheel(delta, audioLevel) {
  if (!wheelModel || !wheelRenderer) return;

  const baseSpeed = 0.003;
  const audioBoost = audioLevel * 0.04;
  const totalSpeed = baseSpeed + scrollWheelSpeed + audioBoost;

  wheelModel.rotation.y += totalSpeed;

  const pulse = 1 + audioLevel * 0.08;
  wheelModel.scale.setScalar(
    (2.5 / Math.max(0.1, wheelModel.scale.x)) * pulse * wheelModel.scale.x,
  );

  if (wheelMixer) {
    wheelMixer.update(delta * (1 + audioLevel * 2));
  }

  wheelRenderer.render(wheelScene, wheelCamera);
}