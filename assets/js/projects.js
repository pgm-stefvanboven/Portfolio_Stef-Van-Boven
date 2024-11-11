document.addEventListener("DOMContentLoaded", function () {
  const workContainer = document.querySelector(".work__container");
  const yearFilter = document.getElementById("yearFilter");

  fetch("./assets/js/data/projects.json")
    .then((response) => response.json())
    .then((data) => {
      // Sorteer eerst op jaar en dan op status binnen hetzelfde jaar
      const projects = data.projects.sort((a, b) => {
        const yearDifference = new Date(b.year) - new Date(a.year);
        if (yearDifference === 0) {
          // Als de jaren gelijk zijn, geef dan "In Progress" voorrang boven "Finished"
          return a.status === "In Progress" && b.status === "Finished" ? -1 : 1;
        }
        return yearDifference;
      });

      populateYearFilter(projects);
      displayProjects(projects);

      // Event listener voor de filter-knoppen
      yearFilter.addEventListener("click", (event) => {
        const selectedButton = event.target.closest(".filter__button");
        if (!selectedButton) return;

        // Update de actieve knop
        document.querySelectorAll(".filter__button").forEach(button => button.classList.remove("active"));
        selectedButton.classList.add("active");

        // Filter en toon de projecten op basis van het geselecteerde jaar
        const selectedYear = selectedButton.getAttribute("data-year");
        const filteredProjects = selectedYear === "all"
          ? projects
          : projects.filter(project => project.year === selectedYear);
        displayProjects(filteredProjects);
      });
    })
    .catch((error) => console.error("Er is een fout opgetreden bij het ophalen van de projectgegevens:", error));

  function populateYearFilter(projects) {
    const uniqueYears = [...new Set(projects.map(project => project.year))];
    uniqueYears.forEach(year => {
      const button = document.createElement("button");
      button.classList.add("filter__button");
      button.setAttribute("data-year", year);
      button.textContent = year;
      yearFilter.appendChild(button);
    });
  }

  function displayProjects(projects) {
    workContainer.innerHTML = "";
    projects.forEach((project) => {
      const projectDiv = document.createElement("div");
      projectDiv.classList.add("work__content");

      const socialLinks = project.socials.map(
        (social) => `<a href="${social.url}" target="_blank" class="work__social"><i class="${social.icon} work__social__icon"></i></a>`
      ).join("");

      const statusIconClass = project.status === "Finished" ? "ri-check-line check" : project.status === "In Progress" ? "ri-time-line progress" : "";

      projectDiv.innerHTML = `
        <a href="#" class="work__link">
          <img src="${project.image}" alt="${project.name}" class="work__img">
          <p>${project.status} <i class="${statusIconClass}"></i></p>
        </a>
        <h3 class="work__title">${project.name}</h3>
        <p class="work__year">${project.year}</p>
        <div class="work__socials">${socialLinks}</div>
      `;

      workContainer.appendChild(projectDiv);
    });
  }
});