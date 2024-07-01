// Selectors for DOM elements
const menuIcon = document.querySelector('#menu-icon');
const navBar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const typingAnimationElement = document.getElementById('typing-animation');

// Default to dark mode
let isDarkMode = true;

// Scroll event listener to highlight active section in navbar
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector('header nav a[href="#' + id + '"]').classList.add('active');
        }
    });
};

// Menu icon click event to toggle navbar visibility
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navBar.classList.toggle('active');
};

// Typing animation or effect logic for styling 
const typingText = [
    'Software Engineer',
    'Web Developer',
    'UI/UX Designer',
    'Mobile App Developer'
];
let index = 0;

function playTypingAnimation(text) {
    let charIndex = 0;
    let typingInterval = setInterval(() => {
        if (charIndex < text.length) {
            typingAnimationElement.textContent += text[charIndex];
            charIndex++;
        } else {
            clearInterval(typingInterval); // Clear interval once text is fully typed
            setTimeout(() => {
                typingAnimationElement.textContent = ''; // Clear text after delay
                index = (index + 1) % typingText.length; // Move to next text in array
                playTypingAnimation(typingText[index]); // Recursively call with next text
            }, 1000); // Delay before clearing text and starting next animation
        }
    }, 100); // Interval between typing each character
}

// Start the initial typing animation
playTypingAnimation(typingText[index]);

// Toggle button for theme (light/dark mode)
const themeToggle = document.getElementById('theme-toggle');

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLightMode = document.body.classList.contains('light-mode');
    themeToggle.style.backgroundColor = isLightMode ? 'var(--light-main-color)' : 'var(--main-color)';
    
    // Save theme preference in localStorage
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
}

// Add click event listener to toggle button
themeToggle.addEventListener('click', toggleTheme);

// Check saved theme preference on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.style.backgroundColor = 'var(--light-main-color)';
} else {
    document.body.classList.remove('light-mode');
    themeToggle.style.backgroundColor = 'var(--main-color)';
}

// Form validation function for email input
function validateForm() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailValue = emailInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for basic email validation

    if (!emailRegex.test(emailValue)) {
        emailError.textContent = 'Please enter a valid email address';
        emailInput.focus();
        return false; // Prevent form submission
    } else {
        emailError.textContent = ''; // Clear any previous error message
        return true; // Allow form submission
    }
}
