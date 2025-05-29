document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const toggleIcon = document.getElementById('toggle-icon');
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (currentTheme === 'dark') {
        themeToggle.checked = true;
        toggleIcon.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            toggleIcon.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            toggleIcon.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
    
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll animation for sections
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    document.querySelectorAll('.section').forEach((section, index) => {
        if (index !== 0) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
    });
    
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Horizontal Scroll Functionality
    function setupHorizontalScroll(containerSelector, leftArrowSelector, rightArrowSelector) {
        const container = document.querySelector(containerSelector);
        const leftArrow = document.querySelector(leftArrowSelector);
        const rightArrow = document.querySelector(rightArrowSelector);
        
        if (!container || !leftArrow || !rightArrow) return;
        
        const scrollAmount = containerSelector === '.skills-container' ? 320 : 350;
        
        leftArrow.addEventListener('click', () => {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        
        rightArrow.addEventListener('click', () => {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
        
        const updateArrows = () => {
            const maxScroll = container.scrollWidth - container.clientWidth;
            
            leftArrow.style.opacity = container.scrollLeft <= 10 ? '0.5' : '1';
            leftArrow.style.cursor = container.scrollLeft <= 10 ? 'default' : 'pointer';
            
            rightArrow.style.opacity = container.scrollLeft >= maxScroll - 10 ? '0.5' : '1';
            rightArrow.style.cursor = container.scrollLeft >= maxScroll - 10 ? 'default' : 'pointer';
        };
        
        container.addEventListener('scroll', updateArrows);
        window.addEventListener('resize', updateArrows);
        updateArrows();
    }
    
    // Initialize horizontal scroll for each section
    setupHorizontalScroll('.skills-container', '.skills-left', '.skills-right');
    setupHorizontalScroll('.projects-container', '.projects-left', '.projects-right');
    setupHorizontalScroll('.certificates-container', '.certificates-left', '.certificates-right');
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const form = e.target;
            const submitBtn = form.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const loader = submitBtn.querySelector('.loading-icon');
            
            // Show loading state
            btnText.style.display = 'none';
            loader.style.display = 'inline-block';
            submitBtn.disabled = true;
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    window.location.href = form.querySelector('[name="_next"]').value;
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                alert('There was a problem sending your message. Please try again later.');
                console.error('Error:', error);
            } finally {
                btnText.style.display = 'inline-block';
                loader.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});