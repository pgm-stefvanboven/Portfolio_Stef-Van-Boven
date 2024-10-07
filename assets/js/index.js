/*=============== HOBBY'S MODAL ===============*/
document.addEventListener("DOMContentLoaded", function () {
  const articles = document.querySelectorAll(".hobbies__card");

  articles.forEach((article, i) => {
    const modal = article.querySelector(".hobbies__modal");
    const modalButton = article.querySelector(".hobbies__button");
    const modalClose = article.querySelector(".hobbies__modal-close");

    modalButton.addEventListener("click", () => {
      modal.classList.add("active-modal");
    });

    modalClose.addEventListener("click", () => {
      modal.classList.remove("active-modal");
    });
  });
});

/*=============== SWIPER TESTIMONIAL ===============*/

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)