import { createHeart } from './particles/heart.js';
import { createGalaxy } from './particles/galaxy.js';

let scene, camera, renderer, points, group;
let currentType = 'heart';
let params = { color: '#ff4d6d', model: '爱心', 全屏: fullscreen, 视野归位: resetView };

init();
initUI();
initHands();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 80;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  group = new THREE.Group();
  scene.add(group);

  buildParticles();
  window.addEventListener('resize', onResize);
}

function buildParticles() {
  group.clear();
  const geometry = currentType === 'heart' ? createHeart() : createGalaxy();
  const material = new THREE.PointsMaterial({ color: params.color, size: 1.5 });
  points = new THREE.Points(geometry, material);
  group.add(points);
}

function initUI() {
  const gui = new lil.GUI();
  gui.add(params, 'model', ['爱心', '星系']).onChange(v => {
    currentType = v === '爱心' ? 'heart' : 'galaxy';
    buildParticles();
  });
  gui.addColor(params, 'color').onChange(v => {
    points.material.color.set(v);
  });
  gui.add(params, '全屏');
  gui.add(params, '视野归位');
}

function initHands() {
  const video = document.getElementById('video');
  const hands = new Hands({ locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}` });
  hands.setOptions({ maxNumHands: 2, modelComplexity: 1 });
  hands.onResults(res => {
    if (!res.multiHandLandmarks) return;
    const lm = res.multiHandLandmarks[0];
    const dx = lm[4].x - lm[8].x;
    const dy = lm[4].y - lm[8].y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const scale = THREE.MathUtils.clamp(dist * 5, 0.5, 3);
    group.scale.set(scale, scale, scale);
    group.position.x = (lm[0].x - 0.5) * 50;
    group.position.y = -(lm[0].y - 0.5) * 30;
  });

  const cam = new Camera(video, {
    onFrame: async () => await hands.send({ image: video }),
    width: 640, height: 480
  });
  cam.start();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function fullscreen() {
  document.documentElement.requestFullscreen();
}
function resetView() {
  camera.position.set(0,0,80);
  group.position.set(0,0,0);
  group.scale.set(1,1,1);
}
function onResize() {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
