// Smooth Scroll Animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute('href'));
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start' // Ensures the target is aligned at the top
      });
    }
  });
});

// Footer Animation
const footerBoxes = document.querySelectorAll('.footer .box'); // Select all footer boxes
const footerCredit = document.querySelector('.footer .credit'); // Select footer credit

const footerObserverOptions = {
  threshold: 0.1 // Trigger animation when 10% of the element is visible
};

const footerObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-footer'); // Add animation class
      observer.unobserve(entry.target); // Stop observing once animation is triggered
    }
  });
}, footerObserverOptions);

// Intersection Observer for Scroll Animations
const sections = document.querySelectorAll('section');
const options = {
  root: null, // The viewport
  threshold: 0.2, // Trigger when 20% of the element is visible
  rootMargin: "0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
}, options);

sections.forEach(section => observer.observe(section));

// Navbar Toggle Animation
const menu = document.querySelector('#menu');
const navbar = document.querySelector('.navbar');

menu.addEventListener('click', () => {
  navbar.classList.toggle('active'); // Toggles the 'active' class for the navbar
  menu.classList.toggle('fa-times'); // Toggles the icon class for menu
});

// Button Hover Ripple Effect
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('mouseenter', function (e) {
    const x = e.clientX - e.target.getBoundingClientRect().left;
    const y = e.clientY - e.target.getBoundingClientRect().top;

    const ripple = document.createElement('span');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');
    this.appendChild(ripple);

    // Remove the ripple after animation ends
    setTimeout(() => {
      ripple.remove();
    }, 500);
  });
});
