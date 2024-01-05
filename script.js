const sections = document.querySelectorAll('.section');
let currentSection = 0;
let interval = true;

// Vérifie si l'appareil prend en charge l'événement 'deviceorientation'
if ('DeviceOrientationEvent' in window) {
    // Demande la permission pour les événements 'deviceorientation' sur iOS
    DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
            if (permissionState === 'granted') {
                // L'autorisation a été accordée, vous pouvez écouter l'événement 'deviceorientation'
                window.addEventListener('deviceorientation', handleOrientation, false);
            } else {
                // L'utilisateur a refusé l'autorisation
                console.error('Permission refusée pour les événements deviceorientation');
            }
        })
        .catch(console.error);
} else {
    console.error("L'appareil ne prend pas en charge l'événement deviceorientation");
}

function handleOrientation(event) {
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
}
