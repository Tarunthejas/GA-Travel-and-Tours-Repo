// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Form submission handling
document.getElementById('enquiryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        destination: document.getElementById('destination').value,
        travelDate: document.getElementById('travelDate').value,
        travelers: document.getElementById('travelers').value,
        message: document.getElementById('message').value
    };
    
    // Display the form data (in real scenario, send to server)
    console.log('Form submitted with data:', formData);
    
    // Show success message
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = 'Thank you! Your enquiry has been submitted successfully. We will contact you soon.';
    messageDiv.className = 'form-message success';
    
    // Reset form
    this.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
    
    // In a real application, you would send this data to a server:
    // fetch('/api/enquiry', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     // Handle success
    // })
    // .catch((error) => {
    //     // Handle error
    // });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards and stat items
document.querySelectorAll('.service-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
