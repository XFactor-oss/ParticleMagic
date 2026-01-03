export function createHeart(THREE) {
  const pts = [];
  for (let t=0; t<Math.PI*2; t+=0.02) {
    const x = 16*Math.pow(Math.sin(t),3);
    const y = 13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t);
    pts.push(x,y,0);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pts,3));
  return g;
}
