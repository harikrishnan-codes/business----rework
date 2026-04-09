// header js 

const hamburger = document.getElementById('hamburger');
const closeBtn = document.getElementById('closeBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileLinks = document.querySelectorAll('.mobile-links a');

// Open Menu
hamburger.addEventListener('click', () => {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevents scrolling when menu is open
});

// Close Menu
closeBtn.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});








// hero js 

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. TEXT SLIDER LOGIC (Auto Swap) ---
    const textSlides = document.querySelectorAll('.slide');
    let currentTextIndex = 0;

    function rotateText() {
        // Find the current active slide
        const activeSlide = textSlides[currentTextIndex];
        
        // 1. Trigger the Exit Animation (CSS handles the blur/fade)
        activeSlide.classList.add('exit');

        setTimeout(() => {
            // 2. Hide the old slide fully
            activeSlide.classList.remove('active', 'exit');

            // 3. Increment index
            currentTextIndex = (currentTextIndex + 1) % textSlides.length;

            // 4. Show the new slide
            textSlides[currentTextIndex].classList.add('active');
        }, 600); // This 600ms matches the CSS transition time
    }

    // Run text swap every 5 seconds
    setInterval(rotateText, 5000);


    // --- 2. BACKGROUND IMAGE SLIDER ---
    const bgSlides = document.querySelectorAll('.bg-slide');
    let currentBgIndex = 0;

    function rotateBackground() {
        bgSlides[currentBgIndex].classList.remove('active');
        currentBgIndex = (currentBgIndex + 1) % bgSlides.length;
        bgSlides[currentBgIndex].classList.add('active');
    }
    
    // Run background swap every 7 seconds
    setInterval(rotateBackground, 7000);


    // --- 3. WAVE ENGINE (Canvas) ---
    const canvas = document.getElementById('waveCanvas');
    const ctx = canvas.getContext('2d');
    let width, height, waves = [];

    function initWaves() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        waves = [
            { y: height * 0.7, length: 0.002, amplitude: 50, speed: 0.02, offset: 0 },
            { y: height * 0.8, length: 0.001, amplitude: 70, speed: 0.01, offset: 100 }
        ];
    }

    function animateWaves() {
        ctx.clearRect(0, 0, width, height);
        waves.forEach((wave, index) => {
            ctx.beginPath();
            ctx.moveTo(0, wave.y);
            for (let i = 0; i < width; i++) {
                const y = wave.y + Math.sin(i * wave.length + wave.offset) * wave.amplitude;
                ctx.lineTo(i, y);
            }
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.fillStyle = index === 0 ? 'rgba(19, 84, 72, 0.1)' : 'rgba(252, 85, 29, 0.05)';
            ctx.fill();
            wave.offset += wave.speed;
        });
        requestAnimationFrame(animateWaves);
    }
    
    window.addEventListener('resize', initWaves);
    initWaves();
    animateWaves();
});





// trusted partner js 

document.addEventListener('DOMContentLoaded', () => {
    const marquee = document.querySelector('.marquee-content');
    
    if (marquee) {
        marquee.addEventListener('mouseenter', () => {
            marquee.style.animationPlayState = 'paused';
        });

        marquee.addEventListener('mouseleave', () => {
            marquee.style.animationPlayState = 'running';
        });
    }
});






// about js

document.addEventListener('DOMContentLoaded', () => {
    // Select elements to reveal
    const revealElements = [
        document.querySelector('.about-image-wrapper'),
        document.querySelector('.about-content h2'),
        document.querySelector('.about-content .lead'),
        document.querySelector('.about-features'),
        document.querySelector('.about .btn')
    ];

    // Add the hidden class initially
    revealElements.forEach(el => el.classList.add('reveal-up'));

    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                aboutObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.2
    });

    revealElements.forEach(el => {
        if(el) aboutObserver.observe(el);
    });
});








// gallery js

document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Apply a staggered entrance
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }, index * 150);
                galleryObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    galleryItems.forEach(item => {
        // Set initial hidden state for JS animation
        item.style.opacity = "0";
        item.style.transform = "translateY(50px)";
        item.style.transition = "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
        galleryObserver.observe(item);
    });
});







// process js

window.addEventListener('scroll', () => {
    const processSection = document.querySelector('.process');
    const items = document.querySelectorAll('.process-item');
    const progressLine = document.getElementById('line-progress');
    
    const sectionRect = processSection.getBoundingClientRect();
    const sectionHeight = processSection.offsetHeight;
    const windowHeight = window.innerHeight;

    // Calculate progress percentage
    // Starts filling when section enters middle of screen
    let progress = (windowHeight / 2 - sectionRect.top) / sectionHeight * 100;
    progress = Math.min(Math.max(progress, 0), 100);
    
    progressLine.style.height = `${progress}%`;

    // Activate items based on scroll
    items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        if (itemRect.top < windowHeight / 1.5) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});







// count js 

const startCounters = () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; 

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// --- The Critical Fix ---
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            startCounters();
            // Stop observing once the animation has started
            counterObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.3 // Trigger when 30% of the section is visible
});

// Make sure this matches your HTML section class exactly
const targetSection = document.querySelector('.why-us-featured');
if (targetSection) {
    counterObserver.observe(targetSection);
}








// price js

document.getElementById('price-toggle').addEventListener('click', function() {
    this.classList.toggle('yearly-active');
    const isYearly = this.classList.contains('yearly-active');
    const amounts = document.querySelectorAll('.amount');

    amounts.forEach(amount => {
        const target = isYearly ? amount.dataset.yearly : amount.dataset.monthly;
        
        // Simple cross-fade value update
        amount.style.opacity = '0';
        setTimeout(() => {
            amount.innerText = target;
            amount.style.opacity = '1';
        }, 200);
    });
});






// testimonial js 

document.addEventListener('DOMContentLoaded', () => {
    const avatarSelector = document.getElementById('avatar-selector');
    const avatarItems = document.querySelectorAll('.avatar-item-v4');
    const textEngine = document.getElementById('text-engine');
    const textBlocks = document.querySelectorAll('#text-engine .text-block');
    
    if (!avatarSelector || !textBlocks.length) return;

    avatarItems.forEach(item => {
        item.addEventListener('click', () => {
            // Get the index of the clicked avatar
            const clickedIndex = item.getAttribute('data-index');

            // --- 1. Reset & Update Avatars (Selection State) ---
            avatarItems.forEach(avatar => {
                avatar.classList.remove('active');
            });
            item.classList.add('active');

            // --- 2. Reset & Update Text Blocks (Fade State) ---
            textBlocks.forEach(block => {
                block.classList.remove('active');
            });
            // Show the text block that matches the avatar index
            textBlocks[clickedIndex].classList.add('active');
        });
    });
});







// faq js

document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
        const parent = item.parentElement;
        
        // If the clicked item is already active, close it
        if (parent.classList.contains('active')) {
            parent.classList.remove('active');
        } else {
            // Close all other open items first (Optional - for a true accordion)
            document.querySelectorAll('.faq-item').forEach(child => {
                child.classList.remove('active');
            });
            
            // Open the clicked item
            parent.classList.add('active');
        }
    });
});







// CTA js

document.addEventListener('mousemove', (e) => {
    const ctaCard = document.querySelector('.cta-glass-card');
    if (!ctaCard) return;

    const rect = ctaCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Move the decorative shapes based on mouse position
    const shape1 = document.querySelector('.shape-1');
    const shape2 = document.querySelector('.shape-2');
    
    if (shape1 && shape2) {
        shape1.style.transform = `translate(${x/20}px, ${y/20}px)`;
        shape2.style.transform = `translate(${-x/20}px, ${-y/20}px)`;
    }
});








// footer js

const footerObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        const columns = document.querySelectorAll('.footer-col');
        columns.forEach((col, index) => {
            setTimeout(() => {
                col.style.opacity = "1";
                col.style.transform = "translateY(0)";
            }, index * 150);
        });
        footerObserver.unobserve(entries[0].target);
    }
}, { threshold: 0.1 });

// Initial State for Footer Columns
document.querySelectorAll('.footer-col').forEach(col => {
    col.style.opacity = "0";
    col.style.transform = "translateY(30px)";
    col.style.transition = "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
});

footerObserver.observe(document.querySelector('.footer'));