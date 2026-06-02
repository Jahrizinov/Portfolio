// =============================================
// PARTICLE SCENE — Full background
// =============================================
import * as THREE from "three";

let particles, particleMaterial;
export let particlesEnabled = true;

const bgCanvas = document.getElementById("vfx-canvas");
const bgScene = new THREE.Scene();
const bgCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
bgCamera.position.z = 5;

export const bgRenderer = new THREE.WebGLRenderer({
  canvas: bgCanvas,
  alpha: false,
  antialias: true,
});
bgRenderer.setPixelRatio(window.devicePixelRatio);
bgRenderer.setSize(window.innerWidth, window.innerHeight);
bgRenderer.setClearColor(0x1a1a1a, 1);

// Build particles
const particleGeometry = new THREE.BufferGeometry();
const vertices = [];
const count = 5000;

for (let i = 0; i < count; i++) {
  vertices.push(
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
  );
}

particleGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(vertices, 3),
);

particleMaterial = new THREE.PointsMaterial({
  color: 0xcc0000,
  size: 0.02,
  transparent: true,
  opacity: 0.5,
  blending: THREE.AdditiveBlending,
});

particles = new THREE.Points(particleGeometry, particleMaterial);
bgScene.add(particles);

// Mouse interaction
let targetX = 0;
let targetY = 0;

document.addEventListener("mousemove", (event) => {
  targetX = (event.clientX - window.innerWidth / 2) / 1000;
  targetY = (event.clientY - window.innerHeight / 2) / 1000;
});

window.addEventListener("resize", () => {
  bgCamera.aspect = window.innerWidth / window.innerHeight;
  bgCamera.updateProjectionMatrix();
  bgRenderer.setSize(window.innerWidth, window.innerHeight);
});

export function setParticlesEnabled(enabled) {
  particlesEnabled = enabled;
  if (particles) particles.visible = enabled;
}

export function animateParticles(audioLevel) {
  if (!particlesEnabled) return;

  particles.rotation.y += 0.001 + audioLevel * 0.005;
  particles.rotation.x += 0.0005;
  particleMaterial.opacity = 0.4 + audioLevel * 0.4;

  bgCamera.position.x += (targetX - bgCamera.position.x) * 0.05;
  bgCamera.position.y += (-targetY - bgCamera.position.y) * 0.05;

  bgRenderer.render(bgScene, bgCamera);
}