 // Detect mobile devices
 function isMobileDevice() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(userAgent);
}

// Mobile preview block logic
const mobilePreview = document.getElementById('mobilePreview');
const closePreviewButton = document.getElementById('closePreview');

if (isMobileDevice()) {
  mobilePreview.classList.add('active');
}

// Allow user to close the preview
closePreviewButton.addEventListener('click', () => {
  mobilePreview.classList.remove('active');
});

// Smooth Scroll Animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute('href'));
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Footer Animation
const footerBoxes = document.querySelectorAll('.footer .box');
const footerCredit = document.querySelector('.footer .credit');
const footerObserverOptions = { threshold: 0.1 };
const footerObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-footer');
      observer.unobserve(entry.target);
    }
  });
}, footerObserverOptions);
footerBoxes.forEach(box => footerObserver.observe(box));

// Intersection Observer for Scroll Animations
const sections = document.querySelectorAll('section');
const options = { root: null, threshold: 0.2, rootMargin: "0px" };
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
  navbar.classList.toggle('active');
  menu.classList.toggle('fa-times');
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

    setTimeout(() => {
      ripple.remove();
    }, 500);
  });
});
