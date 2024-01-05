const sections = document.querySelectorAll('.section');
let currentSection = 0;
let interval = true;

function requestOrientationPermission() {
    if ('DeviceOrientationEvent' in window) {
        // Vérifie si la méthode requestPermission existe
        if (DeviceOrientationEvent.requestPermission) {
            DeviceOrientationEvent.requestPermission()
                .then(response => {
                    if (response == 'granted') {
                        // L'autorisation a été accordée, ajoute l'événement 'deviceorientation'
                        window.addEventListener('deviceorientation', handleOrientation);
                    }
                })
                .catch(console.error);
        } else {
            // La méthode requestPermission n'existe pas, suppose que l'autorisation est accordée
            // Ajoute l'événement 'deviceorientation'
            window.addEventListener('deviceorientation', handleOrientation);
        }
    } else {
        console.error("L'appareil ne prend pas en charge l'événement deviceorientation");
    }
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

// Demande la permission d'orientation lors du chargement de la page (vous pouvez le déclencher à un autre moment)
window.onload = function() {
    const shouldRequestPermission = window.confirm("Voulez-vous autoriser l'accès à l'orientation de l'appareil?");
    if (shouldRequestPermission) {
        requestOrientationPermission();
    }
};
