document.addEventListener("DOMContentLoaded", function () {
  // Check if the page is the homepage
  const isHomePage = window.location.pathname === '/index.html';

  fetch("./assets/js/data/projects.json")
    .then((response) => response.json())
    .then((data) => {
      const currentDate = new Date();
      let projectsToShow = data.projects;

      // Filter the projects only if it is the home page
      if (isHomePage) {
        projectsToShow = projectsToShow.filter(project => new Date(project.year) >= new Date('2023-01-01'));
        projectsToShow.sort((a, b) => new Date(b.year) - new Date(a.year)); // Sort projects by year descending
        projectsToShow = projectsToShow.slice(0, 3); // Only show the first three most recent projects on the homepage
      }

      const workContainer = document.querySelector(".work__container");

      projectsToShow.forEach((project) => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("work__content");

        // Build the project's social link HTML
        const socialLinks = project.socials
          .map(
            (social) =>
              `<a href="${social.url}" target="_blank" class="work__social">
                   <i class="${social.icon} work__social__icon"></i>
                 </a>`
          )
          .join("");

        let statusIconClass = "";
        if (project.status === "Finished") {
          statusIconClass = "ri-check-line check";
        } else if (project.status === "In Progress") {
          statusIconClass = "ri-time-line progress";
        }

        projectDiv.innerHTML = `
          <a href="#" class="work__link">
            <img src="${project.image}" alt="${project.name}" class="work__img">
            <p>${project.status} <i class="${statusIconClass}"></i></p>
          </a>
          <h3 class="work__title">${project.name}</h3>
          <p class="work__year">${project.year}</p>
          <div class="work__socials">
            ${socialLinks}
            <a href="#" class="work__link">
              <i class="ri-arrow-right-circle-line work__social__icon"></i>
            </a>
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