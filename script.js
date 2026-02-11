const canvas = document.getElementById('canvas-fondo');
const ctx = canvas.getContext('2d');
const tronCursor = document.getElementById('tron-cursor');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

// Seguimiento del Mouse para Tron
window.addEventListener('mousemove', (e) => {
    tronCursor.style.left = e.clientX + 'px';
    tronCursor.style.top = e.clientY + 'px';
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = 'rgba(150, 150, 150, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < 80; i++) {
        particlesArray.push(new Particle());
    }
}

function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2) +
                           ((particlesArray[a].y - particlesArray[b].y) ** 2);
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                ctx.strokeStyle = 'rgba(200, 200, 200, 0.2)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray = [];
    init();
});

function copyPGP() {
    const pgpText = document.querySelector('.pgp-key').innerText;
    navigator.clipboard.writeText(pgpText).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.innerText = "¡COPIED!";
        setTimeout(() => btn.innerText = "COPY kEY", 2000);
    });
}

// Función para abrir tarjetas
function expandCard(card) {
    card.classList.toggle('active');
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray = [];
    init();
});
