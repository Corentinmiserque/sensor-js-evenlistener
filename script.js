// const sections = document.querySelectorAll('.section');
// let currentSection = 0;
// let interval = true;

// window.addEventListener('deviceorientation', function(event) {
//     const beta = event.beta;

//     if (interval) {
//        interval = false;

//         if (beta < 45 && currentSection < sections.length - 1) {
//             // Inclinaison vers le haut
//             currentSection++;
//         } else if (beta > 135 && currentSection > 0) {
//             // Inclinaison vers le bas
//             currentSection--;
//         }

//         sections.forEach((section, index) => {
//             section.classList.toggle('active', index === currentSection);
//         });

//         setTimeout(() => {
//             interval = true;
//         }, 750); 
//     }
// }, false);


const sections = document.querySelectorAll('.section');
let currentSection = 0;
let isProcessing = false;
let below = false;
let above = false;

window.addEventListener('deviceorientation', function(event) {
    const beta = event.beta;

    if (!isProcessing) {
        isProcessing = true;

        // Vérification pour la première condition (en dessous de 60 puis remonte au-dessus de 70)
        if (beta < 45 && currentSection < sections.length - 1) {
            below = true;
        } else if (beta > 70 && below) {
            below = false;
            currentSection++;
        }

        // Vérification pour la deuxième condition (au-dessus de 120 puis redescend en dessous de 110)
        if (beta > 140 && currentSection > 0) {
            above = true;
        } else if (beta < 110 && above) {
            above = false;
            currentSection--;
        }

        sections.forEach((section, index) => {
            section.classList.toggle('active', index === currentSection);
        });

        isProcessing = false;
    }
}, false);
