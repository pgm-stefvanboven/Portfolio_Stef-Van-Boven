// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", function () {
  // Check if the current page is the homepage by examining the URL path
  const isHomePage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";

  // Fetch the project data from the JSON file
  fetch("./assets/js/data/projects.json")
    .then((response) => response.json())
    .then((data) => {
      // Get the list of projects from the JSON data
      let projectsToShow = data.projects;

      // Sort projects by year (descending) and by status (In Progress before Finished within the same year)
      projectsToShow = projectsToShow.sort((a, b) => {
        const yearDifference = new Date(b.year) - new Date(a.year);
        if (yearDifference === 0) {
          // Within the same year, prioritize "In Progress" over "Finished"
          return a.status === "In Progress" && b.status === "Finished" ? -1 : 1;
        }
        return yearDifference;
      });

      // Limit the number of projects to the three most recent on the homepage only
      if (isHomePage) {
        projectsToShow = projectsToShow.slice(0, 3);
      }

      // Select the container where projects will be displayed
      const workContainer = document.querySelector(".work__container");

      // Loop through each project and create HTML elements for it
      projectsToShow.forEach((project) => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("work__content");

        // Generate HTML for each social link associated with the project
        const socialLinks = project.socials
          .map(
            (social) =>
              `<a href="${social.url}" target="_blank" class="work__social">
                   <i class="${social.icon} work__social__icon"></i>
                 </a>`
          )
          .join("");

        // Determine the icon class based on the project status
        const statusIconClass = project.status === "Finished" ? "ri-check-line check" :
          (project.status === "In Progress" ? "ri-time-line progress" : "");

        // Create the HTML structure for each project and insert it into the container
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

        // Append the project to the main container
        workContainer.appendChild(projectDiv);
      });
    })
    .catch((error) =>
      // Log an error message if the project data could not be retrieved
      console.error(
        "An error occurred while fetching the project data:",
        error
      )
    );
});