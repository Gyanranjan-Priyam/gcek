// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Scroll Reveal Animation for Sections
const sections = document.querySelectorAll('.wrapper');
const observerOptions = { threshold: 0.2 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      observer.unobserve(entry.target); // Stop observing once revealed
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Button Ripple Hover Effect
document.querySelectorAll('button, .navbar a').forEach(button => {
  button.addEventListener('mouseenter', function (e) {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = 'ripple';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Floating Navbar on Scroll
const header = document.querySelector('header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY) {
    header.classList.add('hidden'); // Hide header when scrolling down
  } else {
    header.classList.remove('hidden'); // Show header when scrolling up
  }
  lastScrollY = currentScrollY;
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

// Observe all footer boxes and credit
footerBoxes.forEach(box => footerObserver.observe(box));
footerObserver.observe(footerCredit);

// Add CSS class for animation
const style = document.createElement('style');
style.textContent = `
  .footer .box,
  .footer .credit {
    opacity: 0; /* Hidden by default */
    transform: translateY(20px); /* Start slightly below its position */
    transition: opacity 0.5s ease, transform 0.5s ease; /* Smooth transition */
  }
  
  .footer .box.animate-footer,
  .footer .credit.animate-footer {
    opacity: 1; /* Fully visible */
    transform: translateY(0); /* Back to original position */
  }
`;
document.head.appendChild(style);

// Typing Effect Function
function typeEffect(element, text, delay = 100, callback = null) {
  let index = 0;
  const typingInterval = setInterval(() => {
    element.textContent += text.charAt(index);
    index++;
    if (index === text.length) {
      clearInterval(typingInterval);
      if (callback) callback(); // Execute callback after typing completes
    }
  }, delay);
}

  // Preloader
  window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    preloader.style.display = "none";
    document.body.classList.add("loaded");
  });


  // Matrix characters
const characters = "01";
const charactersArray = characters.split("");

// Matrix configuration
const fontSize = 16;
const speed = 3;

// Create the canvas and context
const canvas = document.getElementById("matrix");
const context = canvas.getContext("2d");

// Set the canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Calculate the number of columns and rows
const columns = Math.floor(canvas.width / fontSize);
const rows = Math.floor(canvas.height / fontSize);

// Initialize the columns
const matrix = [];
for (let i = 0; i < columns; i++) {
  matrix[i] = 1;
}

// Matrix animation
function drawMatrix() {
  context.fillStyle = "rgba(0, 0, 0, 0.05)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#00ff00";
  context.font = fontSize + "px monospace";

  for (let i = 0; i < matrix.length; i++) {
    const text = charactersArray[Math.floor(Math.random() * charactersArray.length)];
    context.fillText(text, i * fontSize, matrix[i] * fontSize);

    if (matrix[i] * fontSize > canvas.height && Math.random() > 0.975) {
      matrix[i] = 0;
    }

    matrix[i]++;
  }
}

// Render loop
function animateMatrix() {
  drawMatrix();
  requestAnimationFrame(animateMatrix);
}

// Start the animation
animateMatrix();


// Modal functionality 
const modal = document.getElementById("teamModal");
const closeModal = document.querySelector(".close");

// Typing effect for the name
function typeEffect(element, text, speed = 100) {
  element.innerText = ""; // Clear any previous text
  let index = 0;

  function type() {
    if (index < text.length) {
      element.innerText += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }

  type();
}

// When a card is clicked, open the modal and display member info
document.addEventListener("DOMContentLoaded", () => {
  // Select modal elements
  const modal = document.getElementById("teamModal");
  const modalImage = document.getElementById("modal-image");
  const modalName = document.getElementById("modal-name");
  const modalRole = document.getElementById("modal-role");
  const modalEmail = document.getElementById("modal-email");
  const modalSocials = document.getElementById("modal-socials");
  const closeBtn = modal.querySelector(".close");

  // Function to open the modal and populate content
  const openModal = (card) => {
    // Populate modal fields
    modalImage.src = card.dataset.img;
    modalName.textContent = card.dataset.name.replace("_", " ");
    modalRole.textContent = card.dataset.role;
    modalEmail.innerHTML = card.dataset.email;

    // Populate social links
    modalSocials.innerHTML = `
      <a href="${card.dataset.github}" class="fab fa-github" target="_blank"></a>
      <a href="${card.dataset.instagram}" class="fab fa-instagram" target="_blank"></a>
      <a href="mailto:${card.dataset.email}" class="fa fa-envelope" target="_blank"></a>
      <a href="${card.dataset.linkedin}" class="fab fa-linkedin" target="_blank"></a>
    `;

    // Show the modal
    modal.style.display = "block";
  };

  // Add event listeners to all team cards
  const teamCards = document.querySelectorAll(".card");
  teamCards.forEach((card) => {
    card.addEventListener("click", () => openModal(card));
  });

  // Close modal on close button click
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal on outside click
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

// Close the modal when the "close" button is clicked
closeModal.addEventListener("click", function() {
  modal.style.display = "none";
});

// Close the modal when clicking outside the modal content
window.addEventListener("click", function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Get the button
const upButton = document.getElementById("upButton");

// Show the button when the user scrolls down 100px from the top
window.onscroll = function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    upButton.style.display = "block";
  } else {
    upButton.style.display = "none";
  }
};

// Scroll to the top when the button is clicked
upButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scrolling
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".card");
  const socialHTML = card.getAttribute("data-social");
  if (socialHTML) {
    card.innerHTML += socialHTML;
  }
});

