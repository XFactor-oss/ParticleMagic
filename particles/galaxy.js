export function createGalaxy() {
  const points = [];
  for (let i = 0; i < 2000; i++) {
    const r = Math.random() * 30;
    const angle = r * 0.3;
    points.push(Math.cos(angle)*r, (Math.random()-0.5)*5, Math.sin(angle)*r);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
  return g;
}
