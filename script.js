const navLinks = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

// Smooth scrolling for navigation links
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) {
            return;
        }

        e.preventDefault();
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        if (navLinks) {
            navLinks.classList.remove('open');
            menuToggle?.setAttribute('aria-expanded', 'false');
        }
    });
});

// Form submission handling with simple validation
const enquiryForm = document.getElementById('enquiryForm');
const messageDiv = document.getElementById('formMessage');

function showMessage(text, type) {
    if (!messageDiv) {
        return;
    }

    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
}

if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const requiredFields = ['name', 'email', 'phone', 'message'];
        let isValid = true;

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field) {
                return;
            }

            const hasValue = field.value.trim().length > 0;
            field.classList.toggle('invalid', !hasValue);
            if (!hasValue) {
                isValid = false;
            }
        });

        if (!isValid) {
            showMessage('Please complete all required fields before submitting.', 'error');
            return;
        }

        const formData = {
            name: document.getElementById('name')?.value,
            email: document.getElementById('email')?.value,
            phone: document.getElementById('phone')?.value,
            destination: document.getElementById('destination')?.value,
            travelDate: document.getElementById('travelDate')?.value,
            travelers: document.getElementById('travelers')?.value,
            message: document.getElementById('message')?.value
        };

        console.log('Form submitted with data:', formData);
        showMessage('Thank you! Your enquiry has been submitted successfully. We will contact you soon.', 'success');

        enquiryForm.reset();
        document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
    });
}

// Reveal animation on scroll
const revealEls = document.querySelectorAll('.reveal-on-scroll, .stat-item');
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

revealEls.forEach(el => observer.observe(el));
