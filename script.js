const sections = document.querySelectorAll('.section');
let currentSection = 0;
let lastActionTimestamp = 0;

if (location.protocol !== "https:") {
    location.href = "https:" + window.location.href.substring(window.location.protocol.length);
}

function requestMotionPermission() {
    if (typeof(DeviceMotionEvent) !== "undefined" && typeof(DeviceMotionEvent.requestPermission) === "function") {
        // (optional) Faire quelque chose avant la demande de l'API.
        const shouldRequestPermission = window.confirm("Voulez-vous autoriser l'accès aux événements de mouvement de l'appareil?");
        
        if (shouldRequestPermission) {
            DeviceMotionEvent.requestPermission()
                .then(response => {
                    // (optional) Faire quelque chose après la fermeture de la boîte de dialogue de demande d'autorisation.
                    if (response === "granted") {
                        window.addEventListener("devicemotion", handleMotion);
                    }
                })
                .catch(console.error);
        } else {
            console.log("L'utilisateur a refusé la permission.");
        }
    } else {
        alert("DeviceMotionEvent n'est pas défini.");
    }
}

function handleMotion(event) {
    const beta = event.beta;

    const currentTime = new Date().getTime();
    if (currentTime - lastActionTimestamp > 1000) {
        lastActionTimestamp = currentTime;

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
    }
}

// Demande la permission de mouvement lors du chargement de la page (vous pouvez le déclencher à un autre moment)
window.onload = function() {
    requestMotionPermission();
};
