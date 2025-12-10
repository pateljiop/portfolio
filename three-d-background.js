// 3D Background Animation with Three.js
const ThreeDBackground = () => {
  const canvas = document.getElementById('threejs-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x0a0e27, 0);
  camera.position.z = 3;

  // Create animated objects
  const objects = [];
  const geometry = new THREE.IcosahedronGeometry(1, 3);

  for (let i = 0; i < 5; i++) {
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color().setHSL(Math.random() * 0.3 + 0.45, 1, 0.5),
      emissive: new THREE.Color().setHSL(Math.random() * 0.3 + 0.45, 1, 0.3),
      shininess: 100,
      wireframe: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    );
    mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    mesh.velocity = {
      x: (Math.random() - 0.5) * 0.02,
      y: (Math.random() - 0.5) * 0.02,
      z: (Math.random() - 0.5) * 0.02
    };

    scene.add(mesh);
    objects.push(mesh);
  }

  // Lighting
  const light1 = new THREE.PointLight(0x00d4ff, 1.5, 100);
  light1.position.set(5, 5, 5);
  scene.add(light1);

  const light2 = new THREE.PointLight(0x0099ff, 1, 100);
  light2.position.set(-5, -5, 5);
  scene.add(light2);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);

    objects.forEach(obj => {
      obj.rotation.x += obj.velocity.x;
      obj.rotation.y += obj.velocity.y;
      obj.rotation.z += obj.velocity.z;

      obj.position.x += (Math.random() - 0.5) * 0.02;
      obj.position.y += (Math.random() - 0.5) * 0.02;

      // Boundary wrap
      if (Math.abs(obj.position.x) > 5) obj.position.x *= -0.8;
      if (Math.abs(obj.position.y) > 5) obj.position.y *= -0.8;
      if (Math.abs(obj.position.z) > 5) obj.position.z *= -0.8;
    });

    renderer.render(scene, camera);
  };

  // Handle window resize
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener('resize', onWindowResize);
  animate();
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ThreeDBackground);
} else {
  ThreeDBackground();
}
