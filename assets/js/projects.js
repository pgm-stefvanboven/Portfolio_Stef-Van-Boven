// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", function () {
  // Select the main container where projects will be displayed
  const workContainer = document.querySelector(".work__container");
  // Select the year filter element for filtering projects by year
  const yearFilter = document.getElementById("yearFilter");

  // Fetch the project data from the JSON file
  fetch("./assets/js/data/projects.json")
    .then((response) => response.json())
    .then((data) => {
      // Sort projects by year (descending) and then by status (In Progress before Finished within the same year)
      const projects = data.projects.sort((a, b) => {
        const yearDifference = new Date(b.year) - new Date(a.year);
        if (yearDifference === 0) {
          // For projects in the same year, prioritize "In Progress" over "Finished"
          return a.status === "In Progress" && b.status === "Finished" ? -1 : 1;
        }
        return yearDifference;
      });

      // Populate the year filter with unique years and display the projects
      populateYearFilter(projects);
      displayProjects(projects);

      // Add an event listener for clicks on the year filter buttons
      yearFilter.addEventListener("click", (event) => {
        const selectedButton = event.target.closest(".filter__button");
        if (!selectedButton) return;

        // Update the active button style by clearing all active states and setting the clicked button as active
        document.querySelectorAll(".filter__button").forEach(button => button.classList.remove("active"));
        selectedButton.classList.add("active");

        // Filter and display projects based on the selected year from the button's data attribute
        const selectedYear = selectedButton.getAttribute("data-year");
        const filteredProjects = selectedYear === "all"
          ? projects
          : projects.filter(project => project.year === selectedYear);
        displayProjects(filteredProjects);
      });
    })
    .catch((error) => console.error("An error occurred while fetching project data:", error));

  // Function to populate the year filter with unique years from project data
  function populateYearFilter(projects) {
    // Extract unique years from projects and create a button for each year
    const uniqueYears = [...new Set(projects.map(project => project.year))];
    uniqueYears.forEach(year => {
      const button = document.createElement("button");
      button.classList.add("filter__button");
      button.setAttribute("data-year", year);
      button.textContent = year;
      yearFilter.appendChild(button);
    });
  }

  // Function to display projects in the main container
  function displayProjects(projects) {
    // Clear the container before displaying new projects
    workContainer.innerHTML = "";
    // Loop through each project and create HTML elements for it
    projects.forEach((project) => {
      const projectDiv = document.createElement("div");
      projectDiv.classList.add("work__content");

      // Generate HTML for each social link associated with the project
      const socialLinks = project.socials.map(
        (social) => `<a href="${social.url}" target="_blank" class="work__social"><i class="${social.icon} work__social__icon"></i></a>`
      ).join("");

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
        <div class="work__socials">${socialLinks}</div>
      `;

      // Append the project to the main container
      workContainer.appendChild(projectDiv);
    });
  }
});