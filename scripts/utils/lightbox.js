export const displayLightbox = () => {
    const lightbox = document.querySelector('#myLightbox')
    if (lightbox) {
      lightbox.style.display = 'block'
      return lightbox
    }
    const newLightbox = document.createElement("div");
    newLightbox.id = "myLightbox";
    const lightboxContent = document.createElement("div");
    lightboxContent.classList.add("lightbox-content");
    const prev = document.createElement("a");
    const next = document.createElement("a");
    prev.classList.add("change");
    next.classList.add("change");
    prev.textContent = "prev";
    next.textContent = "next";
    newLightbox.appendChild(lightboxContent);
    newLightbox.appendChild(prev);
    newLightbox.appendChild(next);
    const $main = document.querySelector("main");
    $main.append(newLightbox);


    const urlParams = new URLSearchParams(window.location.search);
    const media = urlParams.get('media');
    const changeButtons = document.querySelectorAll(".change");
    changeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (button.textContent === "prev") {
        showSlides(media - 1);
        history.pushState({}, '', `?id=${this.photographerId}&media=${media - 1}`)
        } else {
        showSlides(media + 1);
        history.pushState({}, '', `?id=${this.photographerId}&media=${media + 1}`)
        }
      });
    });

    // const $closeBtn = document.querySelector('.lightbox img')
    // $closeBtn.addEventListener('click', () => {
    //     newLightbox.style.display = 'none'
    // })
    
	
    return newLightbox
}

export const showSlides = (n) => {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    let slideIndex = n;
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
  }

  export const currentSlide = (n) => {
    showSlides(n);
  }
