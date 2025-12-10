// ===== ENHANCED 3D BACKGROUND ANIMATION WITH THREE.JS =====

const ThreeDBackground = () => {
    const canvas = document.getElementById('background-canvas');
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
        antialias: true,
        powerPreference: 'high-performance'
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    camera.position.z = 50;

    // Create larger, more visible particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    // Create particles with color variation
    for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 200;
        posArray[i + 1] = (Math.random() - 0.5) * 200;
        posArray[i + 2] = (Math.random() - 0.5) * 200;
        
        // Add color gradient (blue to purple)
        colors[i] = Math.random() * 0.5 + 0.5; // Red: 0.5-1.0
        colors[i + 1] = Math.random() * 0.5 + 0.3; // Green: 0.3-0.8
        colors[i + 2] = Math.random() * 0.5 + 0.8; // Blue: 0.8-1.0
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Enhanced particle material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 1.5,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.9,
        vertexColors: true,
        emissive: 0x667eea
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Add some floating geometric shapes for extra effect
    const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
    const cubeMaterial = new THREE.MeshPhongMaterial({
        color: 0x667eea,
        wireframe: true,
        emissive: 0x667eea,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.3
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.z = -20;
    scene.add(cube);

    // Add some lighting
    const light = new THREE.PointLight(0x667eea, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x667eea, 0.3);
    scene.add(ambientLight);

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);

        // Rotate particles
        particles.rotation.x += 0.0003;
        particles.rotation.y += 0.0005;
        particles.rotation.z += 0.0002;

        // Mouse interaction
        particles.rotation.x += mouseY * 0.0002;
        particles.rotation.y += mouseX * 0.0003;

        // Rotate cube
        cube.rotation.x += 0.001;
        cube.rotation.y += 0.001;
        cube.rotation.z += 0.0005;

        // Gentle oscillation
        cube.position.y = Math.sin(Date.now() * 0.001) * 5;
        cube.position.x = Math.cos(Date.now() * 0.0008) * 5;

        renderer.render(scene, camera);
    };

    animate();

    return {
        dispose: () => {
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            cubeGeometry.dispose();
            cubeMaterial.dispose();
            renderer.dispose();
        }
    };
};

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        ThreeDBackground();
    });
} else {
    ThreeDBackground();
}