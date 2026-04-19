function showSidebar() {
    document.getElementById("sidebar").style.display = 'flex';
}

function hideSidebar() {
    document.getElementById("sidebar").style.display = 'none';
}

function backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
    const goBackBtn = document.getElementById("goBackBtn");
    if (goBackBtn) {
        goBackBtn.style.display = window.scrollY > 100 ? 'block' : 'none';
    }

    const scrollY = window.scrollY;
    document.querySelectorAll('.bg-sprite, .bg-enemy-sprite').forEach(el => {
        const speed = parseFloat(el.dataset.speed ?? 0.15);
        el.style.translate = `0 ${(scrollY * speed).toFixed(1)}px`;
    });
});

function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.section-3d').forEach(el => observer.observe(el));
}

function setupCardTilt() {
    document.querySelectorAll('.cards').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(600px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(12px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

let slideIndex = 0;
let slides = [];

function initSlide() {
    slides = Array.from(document.querySelectorAll('.slides li'));
    if (slides.length > 0) {
        slides[slideIndex].classList.add("displaySlide");
    }
}

function showSlide() {
    slides.forEach(s => s.classList.remove("displaySlide"));
    slides[slideIndex].classList.add("displaySlide");
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide();
}

function prevSlide() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide();
}

let conceptSlideIndex = 0;
let conceptSlides = [];

function initConceptSlide() {
    conceptSlides = Array.from(document.querySelectorAll('.conceptSlides li'));
    if (conceptSlides.length > 0) {
        conceptSlides[conceptSlideIndex].classList.add("displaySlide");
    }
}

function showConceptSlide() {
    conceptSlides.forEach(s => s.classList.remove("displaySlide"));
    conceptSlides[conceptSlideIndex].classList.add("displaySlide");
}

function nextConceptSlide() {
    conceptSlideIndex = (conceptSlideIndex + 1) % conceptSlides.length;
    showConceptSlide();
}

function prevConceptSlide() {
    conceptSlideIndex = (conceptSlideIndex - 1 + conceptSlides.length) % conceptSlides.length;
    showConceptSlide();
}

const BG_ICONS = [
    'public/sprites/icons/icon-soulfire.svg',
    'public/sprites/icons/icon-boomerang.svg',
    'public/sprites/icons/icon-thunderblade.svg',
    'public/sprites/icons/icon-health.svg',
    'public/sprites/icons/icon-speed.svg',
    'public/sprites/icons/icon-strength.svg',
    'public/sprites/icons/icon-projectile.svg',
    'public/sprites/icons/icon-orbitalshield.svg',
    'public/sprites/icons/icon-attackspeed.svg',
    'public/sprites/icons/icon-food.svg',
];

const BG_ENEMIES = ['wisp', 'wisp-g2', 'neuromachine', 'demon-hand', 'hayato'];

function randomBetween(min, max) {
    return min + Math.random() * (max - min);
}

function generateBgSprites() {
    const container = document.querySelector('.bg-enemies');
    if (!container) return;
    container.innerHTML = '';

    const iconSizes = [100, 150, 200];
    for (let i = 0; i < 12; i++) {
        const img = document.createElement('img');
        img.src = BG_ICONS[i % BG_ICONS.length];
        img.className = 'bg-sprite';
        img.alt = '';

        const size = iconSizes[Math.floor(Math.random() * iconSizes.length)];
        img.style.cssText = `
            width: ${size}px;
            left: ${randomBetween(0, 95).toFixed(1)}%;
            top: ${randomBetween(0, 290).toFixed(1)}vh;
            opacity: ${randomBetween(0.07, 0.16).toFixed(2)};
            --float-dur: ${randomBetween(3, 6).toFixed(1)}s;
            --float-delay: ${randomBetween(0, 5).toFixed(1)}s;
        `;
        img.dataset.speed = randomBetween(0.04, 0.2).toFixed(3);
        container.appendChild(img);
    }

    const enemyPositions = [
        { left: '-5px',  top: '10vh'  },
        { right: '-5px', top: '30vh'  },
        { left: '-5px',  top: '60vh'  },
        { right: '-5px', top: '80vh'  },
        { left: '5%',    top: '140vh' },
        { right: '-5px', top: '160vh' },
        { left: '-5px',  top: '210vh' },
    ];

    const enemySizes = [100, 150, 200];

    enemyPositions.forEach((pos, i) => {
        const type = BG_ENEMIES[i % BG_ENEMIES.length];
        const div = document.createElement('div');
        div.className = `bg-enemy-sprite ${type}`;

        const size = enemySizes[Math.floor(Math.random() * enemySizes.length)];
        const scale = (size / 96).toFixed(3);
        const isRight = pos.right !== undefined;

        div.style.cssText = `
            ${isRight ? `right: ${pos.right}` : `left: ${pos.left}`};
            top: ${pos.top};
            opacity: ${randomBetween(0.12, 0.22).toFixed(2)};
            animation-delay: ${randomBetween(0, 3).toFixed(1)}s, 0s;
            scale: ${scale};
            transform-origin: ${isRight ? 'top right' : 'top left'};
        `;
        div.dataset.speed = randomBetween(0.05, 0.18).toFixed(3);
        container.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    generateBgSprites();
    initSlide();
    initConceptSlide();
    setupScrollReveal();
    setupCardTilt();
});
