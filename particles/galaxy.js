export function createGalaxy(THREE) {
  const pts = [];
  for (let i=0;i<2000;i++){
    const r = Math.random()*30;
    const a = r*0.35;
    pts.push(Math.cos(a)*r,(Math.random()-0.5)*6,Math.sin(a)*r);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pts,3));
  return g;
}
