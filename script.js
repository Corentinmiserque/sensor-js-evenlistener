const sections = document.querySelectorAll('.section');
let currentSection = 0;

window.addEventListener('deviceorientation', function(event) {
    const beta = event.beta;

    if (beta < 45 && currentSection < sections.length - 1) {
        // Inclinaison à haut
        currentSection++;
    } else if (beta > 135 && currentSection > 0) {
        // Inclinaison en bas 
        currentSection--;
    }

    sections.forEach((section, index) => {
        section.classList.toggle('active', index === currentSection);
    });
}, false);

