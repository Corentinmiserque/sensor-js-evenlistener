const sections = document.querySelectorAll('.section');
let currentSection = 0;
let interval = true;

window.addEventListener('deviceorientation', function(event) {
    const beta = event.beta;

    if (interval) {
       interval = false;

        if (beta < 45 && currentSection < sections.length - 1) {
            // Inclinaison vers le haut
            currentSection++;
        } else if (beta > 135 && currentSection > 0) {
            // Inclinaison vers le bas
            currentSection--;
        }

        sections.forEach((section, index) => {
            section.classList.toggle('active', index === currentSection);
        });

        setTimeout(() => {
            interval = true;
        }, 1000); 
    }
}, false);


