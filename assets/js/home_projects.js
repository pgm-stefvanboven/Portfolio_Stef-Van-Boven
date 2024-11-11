document.addEventListener("DOMContentLoaded", function () {
  const isHomePage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";

  fetch("./assets/js/data/projects.json")
    .then((response) => response.json())
    .then((data) => {
      let projectsToShow = data.projects;

      // Sorteer projecten op jaar en status
      projectsToShow = projectsToShow.sort((a, b) => {
        const yearDifference = new Date(b.year) - new Date(a.year);
        if (yearDifference === 0) {
          return a.status === "In Progress" && b.status === "Finished" ? -1 : 1;
        }
        return yearDifference;
      });

      // Beperk het aantal projecten tot de drie meest recente alleen op de homepage
      if (isHomePage) {
        projectsToShow = projectsToShow.slice(0, 3);
      }

      const workContainer = document.querySelector(".work__container");

      projectsToShow.forEach((project) => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("work__content");

        const socialLinks = project.socials
          .map(
            (social) =>
              `<a href="${social.url}" target="_blank" class="work__social">
                   <i class="${social.icon} work__social__icon"></i>
                 </a>`
          )
          .join("");

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