// Custom Cursor Logic
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

// Only enable custom cursor if not on a touch device
if(window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Smooth follow for outline using simple math or direct translate
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Add Hover Effects
    const interactables = document.querySelectorAll('a, .btn, .portfolio-box, .cert-box, .social-media a, .social-media i');
    
    interactables.forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursorDot.classList.add("hovering");
            cursorOutline.classList.add("hovering");
        });
        el.addEventListener("mouseleave", () => {
            cursorDot.classList.remove("hovering");
            cursorOutline.classList.remove("hovering");
        });
    });
}

// Mobile Navbar Toggle
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.querySelector('i').classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};

// Scroll Sections Active Link & Sticky Header
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header = document.querySelector('header');

window.onscroll = () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // Sticky header
    header.classList.toggle('sticky', top > 100);

    // Remove toggle icon and navbar when click navbar link (scroll)
    menuIcon.querySelector('i').classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

// Intersection Observer for Reveal Animations
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('active');
            // Un-comment below to trigger animation only once
            // observer.unobserve(entry.target);
        } else {
            // Remove to allow repeat animation on scroll up
            entry.target.classList.remove('active');
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => revealObserver.observe(el));

// Typed.js Effect
const typed = new Typed('.multiple-text', {
    strings: ['Software Developer', 'Competitive Programmer', 'Problem Solver'],
    typeSpeed: 70,
    backSpeed: 50,
    backDelay: 1500,
    loop: true
});

// ==================================
// THREE.JS 3D BACKGROUND (New Soft Theme)
// ==================================
const canvasContainer = document.getElementById("canvas-container");

// Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x604f71, 0.015); // Fog matching new dark purple bg

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 25);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
canvasContainer.appendChild(renderer.domElement);

// Lighting for elegant shading
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xef98a7, 1.5, 100); // Pinkish light
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xf7bea9, 1.2, 100); // Peach light
pointLight2.position.set(-10, -10, 10);
scene.add(pointLight2);

// Main abstract shape (Torus Knot)
const coreGroup = new THREE.Group();
scene.add(coreGroup);

const knotGeo = new THREE.TorusKnotGeometry(6, 1.5, 200, 32);
const knotMat = new THREE.MeshStandardMaterial({
    color: 0x807094, // Muted purple
    roughness: 0.2,
    metalness: 0.8,
    wireframe: true,
    transparent: true,
    opacity: 0.4
});
const torusKnot = new THREE.Mesh(knotGeo, knotMat);
coreGroup.add(torusKnot);

const solidKnotGeo = new THREE.TorusKnotGeometry(5.8, 1.4, 100, 16);
const solidKnotMat = new THREE.MeshStandardMaterial({
    color: 0xef98a7, // Pinkish
    roughness: 0.1,
    metalness: 0.3
});
const solidKnot = new THREE.Mesh(solidKnotGeo, solidKnotMat);
coreGroup.add(solidKnot);

// Particles background
const particlesGeo = new THREE.BufferGeometry();
const particlesCount = 800;
const posArray = new Float32Array(particlesCount * 3);
for(let i=0; i < particlesCount*3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
}
particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMat = new THREE.PointsMaterial({
    color: 0xfcfcfb, // White/Cream
    size: 0.1,
    transparent: true,
    opacity: 0.5
});
const particles = new THREE.Points(particlesGeo, particlesMat);
scene.add(particles);

// Mouse Interaction variables
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) * 0.005;
    mouseY = (event.clientY - windowHalfY) * 0.005;
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Rotate shapes
    torusKnot.rotation.y = elapsedTime * 0.2;
    torusKnot.rotation.x = elapsedTime * 0.1;
    solidKnot.rotation.y = elapsedTime * 0.2;
    solidKnot.rotation.x = elapsedTime * 0.1;

    // Float particles slowly
    particles.rotation.y = elapsedTime * 0.05;
    particles.rotation.x = elapsedTime * 0.02;

    // Smooth Camera Parallax Shift based on mouse
    targetX = mouseX * 2;
    targetY = mouseY * 2;
    
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (-targetY - camera.position.y) * 0.05; 
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ==================================
// VANILLA TILT 3D CARDS
// ==================================
VanillaTilt.init(document.querySelectorAll(".portfolio-box, .cert-box, .grid-card, .resume-img-container"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    scale: 1.05
});

