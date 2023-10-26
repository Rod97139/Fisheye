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
    newLightbox.appendChild(lightboxContent);
    const $main = document.querySelector("main");
    $main.append(newLightbox);


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

export const accessibilityEvents = (App) => {
  if (App.accessibilityEventsEnabled === false) {
    document.addEventListener('keydown', (event) => {
        if ((event.key === 'ArrowRight') && (App.page.displaiedMedia !== null)) {
            let slideIndex = parseInt(App.page.displaiedMedia) + 1;
            currentSlide(slideIndex)
            if (slideIndex > App.page.medias.length) {slideIndex = 1}
            history.pushState({}, '', `?id=${App.page.photographerId}&media=${slideIndex}`)
            App.page.displaiedMedia = slideIndex
            console.log('Touche de la flèche droite appuyée', slideIndex);
        }
    })
    document.addEventListener('keydown', (event) => {
        if ((event.key === 'ArrowLeft') && (App.page.displaiedMedia !== null)) {
            let slideIndex = parseInt(App.page.displaiedMedia) - 1;
            currentSlide(slideIndex)
            if (slideIndex < 1) {slideIndex = App.page.medias.length}
            history.pushState({}, '', `?id=${App.page.photographerId}&media=${slideIndex}`)
            App.page.displaiedMedia = slideIndex
            console.log('Touche de la flèche gauche appuyée', slideIndex);
        }
    })
    App.accessibilityEventsEnabled = true;
  }
}
