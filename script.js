// ============================================
// 3D Background with Three.js
// ============================================

const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Create geometric shapes
const shapes = [];

// Icosahedron
const icoGeometry = new THREE.IcosahedronGeometry(1, 0);
const icoMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x00ff88, 
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
icosahedron.position.set(-5, 2, -10);
scene.add(icosahedron);
shapes.push({ mesh: icosahedron, speedX: 0.002, speedY: 0.003 });

// Torus
const torusGeometry = new THREE.TorusGeometry(1.5, 0.4, 16, 100);
const torusMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x00d4ff, 
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(5, -2, -8);
scene.add(torus);
shapes.push({ mesh: torus, speedX: 0.003, speedY: 0.002 });

// Octahedron
const octGeometry = new THREE.OctahedronGeometry(1.2, 0);
const octMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xff00ff, 
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const octahedron = new THREE.Mesh(octGeometry, octMaterial);
octahedron.position.set(0, 5, -12);
scene.add(octahedron);
shapes.push({ mesh: octahedron, speedX: 0.001, speedY: 0.004 });

// Sphere with particles
const sphereGeometry = new THREE.SphereGeometry(0.8, 32, 32);
const sphereMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xffff00, 
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-3, -4, -9);
scene.add(sphere);
shapes.push({ mesh: sphere, speedX: 0.004, speedY: 0.001 });

// Dodecahedron
const dodecGeometry = new THREE.DodecahedronGeometry(1.3, 0);
const dodecMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xff6600, 
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const dodecahedron = new THREE.Mesh(dodecGeometry, dodecMaterial);
dodecahedron.position.set(6, 3, -11);
scene.add(dodecahedron);
shapes.push({ mesh: dodecahedron, speedX: 0.002, speedY: 0.002 });

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 500;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 50;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x00ff88,
    transparent: true,
    opacity: 0.8
});
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0x00ff88, 1);
pointLight1.position.set(10, 10, 10);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x00d4ff, 1);
pointLight2.position.set(-10, -10, 10);
scene.add(pointLight2);

camera.position.z = 5;

// Mouse interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate shapes
    shapes.forEach(shape => {
        shape.mesh.rotation.x += shape.speedX;
        shape.mesh.rotation.y += shape.speedY;
    });
    
    // Rotate particles
    particles.rotation.y += 0.0005;
    
    // Mouse interaction
    camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

animate();

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ============================================
// Terminal Functionality
// ============================================

const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');

const commands = {
    help: `Available commands:
  <span class="command">about</span>     - Learn about me
  <span class="command">skills</span>    - View my skills
  <span class="command">projects</span>  - See my projects
  <span class="command">contact</span>   - Get contact info
  <span class="command">social</span>    - Social media links
  <span class="command">clear</span>     - Clear terminal
  <span class="command">theme</span>     - Toggle theme`,

    about: `Hi! I'm a passionate Full Stack Developer with 5+ years of experience.
I specialize in creating interactive web experiences and love working with 
cutting-edge technologies like Three.js, React, and Node.js.

When I'm not coding, you can find me exploring new technologies, 
contributing to open source, or creating digital art.`,

    skills: `Technical Skills:
  
  Frontend:    ████████████████████ 95%
  Backend:     ██████████████████░░ 90%
  3D/Graphics: █████████████████░░░ 85%
  DevOps:      ████████████████░░░░ 80%
  
  Languages: JavaScript, TypeScript, Python, Go
  Frameworks: React, Vue, Node.js, Express
  Tools: Git, Docker, AWS, Figma`,

    projects: `Featured Projects:

  🌐 E-Commerce Platform
     A full-stack e-commerce solution with real-time inventory
  
  🎮 3D Product Configurator
     Interactive 3D product visualization using Three.js
  
  📱 Task Management App
     Cross-platform mobile app with 10k+ downloads
  
  Type 'contact' to learn how to work with me!`,

    contact: `Get in touch:
  
  📧 Email: hello@portfolio.dev
  📍 Location: San Francisco, CA
  💼 Available for freelance work
  
  Or use the contact form below!`,

    social: `Find me online:
  
  🔗 GitHub:    github.com/yourusername
  💼 LinkedIn:  linkedin.com/in/yourusername
  🐦 Twitter:   twitter.com/yourusername
  📸 Instagram: instagram.com/yourusername`,

    theme: function() {
        const body = document.body;
        const currentBg = getComputedStyle(body).getPropertyValue('--bg-dark').trim();
        if (currentBg === '#0a0a0f') {
            document.documentElement.style.setProperty('--bg-dark', '#ffffff');
            document.documentElement.style.setProperty('--text-primary', '#0a0a0f');
            document.documentElement.style.setProperty('--text-secondary', '#333333');
            document.documentElement.style.setProperty('--terminal-bg', '#f0f0f0');
            return 'Theme switched to light mode!';
        } else {
            document.documentElement.style.setProperty('--bg-dark', '#0a0a0f');
            document.documentElement.style.setProperty('--text-primary', '#ffffff');
            document.documentElement.style.setProperty('--text-secondary', '#a0a0b0');
            document.documentElement.style.setProperty('--terminal-bg', '#1a1a2e');
            return 'Theme switched to dark mode!';
        }
    },

    clear: function() {
        terminalOutput.innerHTML = '';
        return null;
    },

    whoami: 'visitor@portfolio',
    date: () => new Date().toString(),
    ls: 'about.html  skills.json  projects/  contact.txt  resume.pdf',
    pwd: '/home/user/portfolio',
    uname: 'Portfolio OS v1.0.0'
};

// Welcome message
const welcomeMessage = `Welcome to my portfolio terminal!
Type <span class="command">'help'</span> to see available commands.
─────────────────────────────────────`;

terminalOutput.innerHTML = `<div class="output-line">${welcomeMessage}</div>`;

// Command history
let commandHistory = [];
let historyIndex = -1;

// Handle Enter key
terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = terminalInput.value.trim();
        
        if (input) {
            commandHistory.push(input);
            historyIndex = commandHistory.length;
            
            // Add command to output
            const commandLine = document.createElement('div');
            commandLine.className = 'output-line';
            commandLine.innerHTML = `<span class="prompt">user@portfolio:~$</span> ${input}`;
            terminalOutput.appendChild(commandLine);
            
            // Process command
            const cmd = input.toLowerCase().split(' ')[0];
            const args = input.split(' ').slice(1).join(' ');
            
            let response;
            if (commands[cmd]) {
                if (typeof commands[cmd] === 'function') {
                    response = commands[cmd](args);
                } else {
                    response = commands[cmd];
                }
            } else {
                response = `Command not found: ${cmd}. Type 'help' for available commands.`;
            }
            
            if (response !== null) {
                const responseLine = document.createElement('div');
                responseLine.className = 'output-line';
                responseLine.innerHTML = response;
                terminalOutput.appendChild(responseLine);
            }
            
            // Clear input
            terminalInput.value = '';
            
            // Scroll to bottom
            const terminalBody = document.getElementById('terminal');
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            terminalInput.value = '';
        }
    }
});

// Keep focus on terminal input
terminalInput.addEventListener('blur', () => {
    setTimeout(() => terminalInput.focus(), 10);
});

// ============================================
// Animated Skill Bars
// ============================================

const observerOptions = {
    threshold: 0.5
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            const width = fill.getAttribute('data-width');
            fill.style.width = width + '%';
        }
    });
}, observerOptions);

document.querySelectorAll('.fill').forEach(fill => {
    skillObserver.observe(fill);
});

// ============================================
// Animated Counter for Stats
// ============================================

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const target = parseInt(statNumber.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    statNumber.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    statNumber.textContent = target + '+';
                }
            };
            
            updateCounter();
            statObserver.unobserve(statNumber);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(stat => {
    statObserver.observe(stat);
});

// ============================================
// Smooth Scroll for Navigation
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Form Submission Handler
// ============================================

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        
        // Show success message (in real app, send to server)
        const btn = contactForm.querySelector('.btn-submit');
        const originalText = btn.textContent;
        btn.textContent = 'Message Sent! ✓';
        btn.style.background = 'linear-gradient(135deg, #00ff88, #00ff88)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}

// ============================================
// 3D Card Hover Effect
// ============================================

document.querySelectorAll('.card-3d').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

console.log('%c Welcome to my Portfolio! ', 'background: #00ff88; color: #0a0a0f; font-size: 20px; padding: 10px;');
console.log('Built with ❤️ using Three.js and vanilla JavaScript');
