document.addEventListener("DOMContentLoaded", function () {
  // Controleer of de pagina de homepage is
  const isHomePage = window.location.pathname.includes('index');

  fetch("./assets/js/data/projects.json")
    .then((response) => response.json())
    .then((data) => {
      let projectsToShow = data.projects;

      // Sorteer projecten op jaar (nieuwste eerst) en status (In Progress eerst)
      projectsToShow = projectsToShow.sort((a, b) => {
        const yearDifference = new Date(b.year) - new Date(a.year);
        if (yearDifference === 0) {
          // Binnen hetzelfde jaar, geef "In Progress" voorrang boven "Finished"
          return a.status === "In Progress" && b.status === "Finished" ? -1 : 1;
        }
        return yearDifference;
      });

      // Beperk het aantal projecten tot de drie meest recente
      if (isHomePage) {
        projectsToShow = projectsToShow.slice(0, 3);
      }

      const workContainer = document.querySelector(".work__container");

      projectsToShow.forEach((project) => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("work__content");

        // Maak de HTML voor de social links van het project
        const socialLinks = project.socials
          .map(
            (social) =>
              `<a href="${social.url}" target="_blank" class="work__social">
                   <i class="${social.icon} work__social__icon"></i>
                 </a>`
          )
          .join("");

        // Stel de status icon class in op basis van de projectstatus
        const statusIconClass = project.status === "Finished" ? "ri-check-line check" :
          (project.status === "In Progress" ? "ri-time-line progress" : "");

        projectDiv.innerHTML = `
          <a href="#" class="work__link">
            <img src="${project.image}" alt="${project.name}" class="work__img">
            <p>${project.status} <i class="${statusIconClass}"></i></p>
          </a>
          <h3 class="work__title">${project.name}</h3>
          <p class="work__year">${project.year}</p>
          <div class="work__socials">
            ${socialLinks}
          </div>
        `;

        workContainer.appendChild(projectDiv);
      });
    })
    .catch((error) =>
      console.error(
        "Er is een fout opgetreden bij het ophalen van de projectgegevens:",
        error
      )
    );
});