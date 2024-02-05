export const displayLightbox = () => {
    const lightbox = document.querySelector('#myLightbox')
    if (lightbox) {
      lightbox.style.display = 'block'
      lightbox.setAttribute("aria-hidden", "false");
      return lightbox
    }
    const newLightbox = document.createElement("div");
    newLightbox.id = "myLightbox";
    newLightbox.setAttribute("role", "dialog");
    newLightbox.setAttribute("aria-hidden", "true");
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
      slides[i].setAttribute("aria-hidden", "true");
    }
    slides[slideIndex-1].style.display = "block";
    slides[slideIndex-1].setAttribute("aria-hidden", "false");
    const video = slides[slideIndex-1].querySelector('video')
    video?.play()
  }

export const currentSlide = (n) => {
    showSlides(n);
}

export const closeLightbox = () => {

    const lightbox = document.querySelector('#myLightbox')
    lightbox.style.display = 'none'
    lightbox.setAttribute("aria-hidden", "true");
}

export const accessibilityEvents = (App) => {
  if (App.accessibilityEventsEnabled === false) {
    document.addEventListener('keydown', (event) => {
        if ((event.key === 'ArrowRight') && (App.page.displaiedMedia !== null)) {
            let slideIndex = parseInt(App.page.displaiedMedia) + 1;
            currentSlide(slideIndex)
            if (slideIndex > App.page.medias.length) {slideIndex = 1}
            history.pushState({}, '', `?id=${App.page.photographerId}&media=${slideIndex}&sortBy=${App.page.sortBy}`)
            App.page.displaiedMedia = slideIndex
            console.log('Touche de la flèche droite appuyée', slideIndex);
        }
    })
    document.addEventListener('keydown', (event) => {
        if ((event.key === 'ArrowLeft') && (App.page.displaiedMedia !== null)) {
            let slideIndex = parseInt(App.page.displaiedMedia) - 1;
            currentSlide(slideIndex)
            if (slideIndex < 1) {slideIndex = App.page.medias.length}
            history.pushState({}, '', `?id=${App.page.photographerId}&media=${slideIndex}&sortBy=${App.page.sortBy}`)
            App.page.displaiedMedia = slideIndex
            console.log('Touche de la flèche gauche appuyée', slideIndex);
        }
    })
    document.addEventListener('keydown', (event) => {
        if ((event.key === 'Escape') && (App.page.displaiedMedia !== null)) {
            history.pushState({}, '', `?id=${App.page.photographerId}&sortBy=${App.page.sortBy}`)
            App.page.displaiedMedia = null
            closeLightbox()
            console.log('Touche Echap appuyée', slideIndex);
        }
    })
    App.accessibilityEventsEnabled = true;
  }
}
