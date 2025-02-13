// DOWNLOAD BUTTON

document.getElementById("downloadBtn").addEventListener("click", function () {
    const button = this;

    // Knop verkleinen als visuele feedback
    button.style.transform = "scale(0.95)";

    // Simuleer laden: verander tekst en voeg loader toe
    button.innerHTML = 'Bezig met downloaden <span class="loader"></span>';
    button.disabled = true;

    setTimeout(() => {
        // Start de echte download
        const link = document.createElement("a");
        link.href = "assets/pdf/CV - Stef Van Boven.pdf";
        link.download = "CV - Stef Van Boven.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Knop vergroten, kleur veranderen en checkmark tonen
        button.style.transform = "scale(1.05)";
        button.style.backgroundColor = "#4CAF50"; // Groen
        button.innerHTML = 'Gedownload <span class="checkmark">✔</span>';
    }, 2000); // Simuleer een korte laadtijd

    // Reset de knop na 3 seconden
    setTimeout(() => {
        button.style.transform = "scale(1)";
        button.style.backgroundColor = "#2196F3"; // Blauw
        button.innerHTML = 'Download CV';
        button.disabled = false;
    }, 5000);
});

// TYPING EFFECT

const nameText = "Stef Van Boven";
const typedName = document.getElementById("typed-name");
let i = 0;

function typeEffect() {
    if (i < nameText.length) {
        typedName.innerHTML += nameText.charAt(i);
        i++;
        setTimeout(typeEffect, 100);
    }
}

window.onload = typeEffect;