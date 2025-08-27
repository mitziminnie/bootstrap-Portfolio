
        document.addEventListener('DOMContentLoaded', function () {
            // Theme Toggle
            const themeToggle = document.getElementById('themeToggle');
            const themeIcon = themeToggle.querySelector('i');

            // Check for saved theme preference
            if (localStorage.getItem('theme') === 'dark') {
                document.body.classList.add('dark-mode');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }

            themeToggle.addEventListener('click', function () {
                document.body.classList.toggle('dark-mode');

                if (document.body.classList.contains('dark-mode')) {
                    localStorage.setItem('theme', 'dark');
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                } else {
                    localStorage.setItem('theme', 'light');
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            });

            // Smooth Scroll for navigation links
            document.querySelectorAll('a.nav-link, .footer-link').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();

                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;

                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        // Update active nav link
                        document.querySelectorAll('.nav-link').forEach(link => {
                            link.classList.remove('active');
                        });
                        this.classList.add('active');

                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Back to Top Button
            const backToTopButton = document.getElementById('backToTop');

            window.addEventListener('scroll', function () {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.add('show');
                } else {
                    backToTopButton.classList.remove('show');
                }

                // Section reveal animation
                const sections = document.querySelectorAll('.section-hidden');
                const scrollPosition = window.pageYOffset + window.innerHeight;

                sections.forEach(section => {
                    if (scrollPosition > section.offsetTop + 100) {
                        section.classList.add('section-visible');
                    }
                });
            });

            backToTopButton.addEventListener('click', function (e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // Portfolio Filter
            const filterButtons = document.querySelectorAll('.filter-btn');
            const portfolioItems = document.querySelectorAll('.portfolio-item');

            filterButtons.forEach(button => {
                button.addEventListener('click', function () {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));

                    // Add active class to clicked button
                    this.classList.add('active');

                    const filterValue = this.getAttribute('data-filter');

                    portfolioItems.forEach(item => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.classList.add('show');
                            }, 50);
                        } else {
                            item.classList.remove('show');
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });

            // Animate progress bars when they come into view
            function animateProgressBars() {
                const progressBars = document.querySelectorAll('.progress-bar');
                const progressSection = document.getElementById('skills');

                if (isElementInViewport(progressSection)) {
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('aria-valuenow') + '%';
                        bar.style.width = width;
                    });

                    // Remove event listener after animation
                    window.removeEventListener('scroll', animateProgressBars);
                }
            }

            function isElementInViewport(el) {
                const rect = el.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            }

            window.addEventListener('scroll', animateProgressBars);
            // Initial check
            animateProgressBars();

            // Form Validation and PHP Simulation
            const contactForm = document.getElementById('contactForm');
            const toastNotification = document.getElementById('toastNotification');
            const toastMessage = document.getElementById('toastMessage');

            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();

                let isValid = true;
                const inputs = this.querySelectorAll('input, textarea');

                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = 'red';
                    } else {
                        input.style.borderColor = '';
                    }
                });

                if (isValid) {
                    // Simulate form submission to PHP
                    const formData = new FormData(this);

                    // In a real implementation, you would send this to a PHP script
                    // fetch('process_form.php', { method: 'POST', body: formData })
                    //   .then(response => response.json())
                    //   .then(data => { ... });

                    // Show success message
                    toastMessage.textContent = 'Message sent successfully!';
                    toastNotification.style.background = 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)';
                    toastNotification.classList.add('show');

                    // Reset form
                    this.reset();

                    // Hide notification after 3 seconds
                    setTimeout(() => {
                        toastNotification.classList.remove('show');
                    }, 3000);
                }
            });

            // Initialize all portfolio items to show
            setTimeout(() => {
                portfolioItems.forEach(item => {
                    item.classList.add('show');
                });
            }, 500);

            // Typing effect for hero section
            const texts = [
                "Full Stack Developer",
                "JavaScript Expert",
                "React Specialist",
                "Node.js Developer",
                "Web Applications Creator",
                "Back-end specialist"
            ];

            const typingElement = document.getElementById('typing');
            const typingDelay = 100;
            const erasingDelay = 80;
            const newTextDelay = 1500;
            let textIndex = 0;
            let charIndex = 0;
            let isErasing = false;

            function type() {
                const currentText = texts[textIndex];

                if (!isErasing) {
                    // Typing phase
                    typingElement.textContent = currentText.substring(0, charIndex + 1);
                    charIndex++;

                    if (charIndex === currentText.length) {
                        isErasing = true;
                        setTimeout(type, newTextDelay);
                        return;
                    }
                } else {
                    // Erasing phase
                    typingElement.textContent = currentText.substring(0, charIndex - 1);
                    charIndex--;

                    if (charIndex === 0) {
                        isErasing = false;
                        textIndex++;
                        if (textIndex === texts.length) textIndex = 0;
                    }
                }

                setTimeout(type, isErasing ? erasingDelay : typingDelay);
            }

            // Start the typing effect
            setTimeout(type, 1000);
        });
    