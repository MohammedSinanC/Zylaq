document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navMenu.classList.contains('active') ? 'close-outline' : 'menu-outline';
        hamburger.innerHTML = `<ion-icon name="${icon}"></ion-icon>`;
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.innerHTML = `<ion-icon name="menu-outline"></ion-icon>`;
        });
    });

    // 2. Sticky Navbar Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // 4. Add to Cart Logic & Toast Notification
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const cartCountEl = document.querySelector('.cart-count');
    const cartToast = document.getElementById('cart-toast');
    let cartCount = 0;

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update Cart Count
            cartCount++;
            cartCountEl.textContent = cartCount;
            
            // Animate Icon
            cartCountEl.style.transform = 'scale(1.5)';
            setTimeout(() => {
                cartCountEl.style.transform = 'scale(1)';
            }, 300);

            // Show Toast
            cartToast.classList.add('show');
            setTimeout(() => {
                cartToast.classList.remove('show');
            }, 3000);
        });
    });

    // 5. Countdown Timer
    const countdown = () => {
        const countDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); // 7 days from now

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const gap = countDate - now;

            if (gap < 0) {
                clearInterval(interval);
                return;
            }

            const second = 1000;
            const minute = second * 60;
            const hour = minute * 60;
            const day = hour * 24;

            const textDay = Math.floor(gap / day);
            const textHour = Math.floor((gap % day) / hour);
            const textMinute = Math.floor((gap % hour) / minute);
            const textSecond = Math.floor((gap % minute) / second);

            document.getElementById('days').innerText = textDay < 10 ? '0' + textDay : textDay;
            document.getElementById('hours').innerText = textHour < 10 ? '0' + textHour : textHour;
            document.getElementById('mins').innerText = textMinute < 10 ? '0' + textMinute : textMinute;
            document.getElementById('secs').innerText = textSecond < 10 ? '0' + textSecond : textSecond;
        }, 1000);
    };

    countdown();

    // 6. Active Nav Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-list a[href*=${sectionId}]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });

    // 7. Form Submission Prevent Default
    const newsletterForm = document.getElementById('newsletter-form');
    if(newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            input.value = '';
            
            // Show toast for newsletter
            cartToast.querySelector('span').textContent = 'Successfully subscribed!';
            cartToast.classList.add('show');
            setTimeout(() => {
                cartToast.classList.remove('show');
                setTimeout(() => {
                    cartToast.querySelector('span').textContent = 'Item added to cart!'; // Reset text
                }, 400);
            }, 3000);
        });
    }
});
