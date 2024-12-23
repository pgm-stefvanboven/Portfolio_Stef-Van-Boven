async function fetchAndDisplaySkills() {
    try {
        const response = await fetch("./assets/js/data/skills.json");
        const data = await response.json();
        const skills = data.Skills; // JSON bevat de "Skills" array

        // Sorteer de skills op basis van `progress` in aflopende volgorde
        skills.sort((a, b) => b.progress - a.progress);

        const skillsContainer = document.querySelector('.about__skills-content');
        skillsContainer.innerHTML = '';

        skills.forEach(skill => {
            const skillCard = document.createElement('article');
            skillCard.classList.add('skills__card');
            skillCard.dataset.progress = skill.progress;

            // Controleer of de staat "Still using" is, verander het naar "Experienced" voor een betere weergave
            const stateText = skill.state === "Still using" ? "Experienced" : skill.state;

            skillCard.innerHTML = `
                <img src="${skill.image}" alt="${skill.title} image" class="skills__image" />
                <h2 class="skills__title">${skill.title}</h2>
                <h4 class="skills__state">${stateText}</h4>
                <h3 class="skills__percentage">${skill.progress}%</h3>
                <div class="skills__progress-bar" style="--progress: ${skill.progress}%"></div>
            `;

            skillsContainer.appendChild(skillCard);
        });
    } catch (error) {
        console.error("Fout bij het ophalen van de skills:", error);
    }
}

fetchAndDisplaySkills();