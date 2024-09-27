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
    const prev = document.createElement('a');
    prev.classList.add('prev', 'hover-scale');
    prev.textContent = 'prev';
    newLightbox.appendChild(prev);
    const next = document.createElement('a');
    next.classList.add('next', 'hover-scale');
    next.textContent = 'next';
    newLightbox.appendChild(next);
    const close = document.createElement('a');
    close.classList.add('close', 'hover-scale');
    close.textContent = 'close';
    newLightbox.appendChild(close);
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
    const lightbox = document.querySelector('.lightbox-content')
    const slides = document.getElementsByClassName("mySlides");
    let slideIndex = n;
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].setAttribute("aria-hidden", "true");
    }
    lightbox.style = `transform: translateX(-${100 * (slideIndex - 1)}%);`
    slides[slideIndex-1].setAttribute("aria-hidden", "false");
    const video = slides[slideIndex-1].querySelector('video')
    video?.play()
  }

export const currentSlide = (n) => {
    showSlides(n);
    const DomToHide = document.querySelectorAll('main section')
    const customSelect = document.querySelector('.custom-select')
    customSelect.style.display = 'none'
    const header = document.querySelector('header')
    header.setAttribute("aria-hidden", "true");
    header.classList.add('blur')
    DomToHide.forEach((element) => {
        element.setAttribute("aria-hidden", "true");
        element.classList.add('blur')
    })
}

export const closeLightbox = () => {
    const customSelect = document.querySelector('.custom-select')
    customSelect.style.display = 'block'

    const lightbox = document.querySelector('#myLightbox')
    lightbox.style.display = 'none'
    lightbox.setAttribute("aria-hidden", "true");
    const DomToShow = document.querySelectorAll('.blur')
    DomToShow.forEach((element) => {
        element.setAttribute("aria-hidden", "false");
        element.classList.remove('blur')
    })
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
            console.log('Touche Echap appuyée');
        }
    })

    /**
     * @description Swipe event for mobile
     */
    
    // phone scroll event 
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    let xDown = null;
    let yDown = null;
    function getTouches(evt) {
        return evt.touches || evt.originalEvent.touches;
    }
    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    }

    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }
        let xUp = evt.touches[0].clientX;
        let yUp = evt.touches[0].clientY;
        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                let slideIndex = parseInt(App.page.displaiedMedia) + 1;
                currentSlide(slideIndex)
                if (slideIndex > App.page.medias.length) {slideIndex = 1}
                history.pushState({}, '', `?id=${App.page.photographerId}&media=${slideIndex}&sortBy=${App.page.sortBy}`)
                App.page.displaiedMedia = slideIndex
                console.log('swipe left');
            } else {
                let slideIndex = parseInt(App.page.displaiedMedia) - 1;
                currentSlide(slideIndex)
                if (slideIndex < 1) {slideIndex = App.page.medias.length}
                history.pushState({}, '', `?id=${App.page.photographerId}&media=${slideIndex}&sortBy=${App.page.sortBy}`)
                App.page.displaiedMedia = slideIndex
                console.log('swipe right');
            }
        }
        xDown = null;
        yDown = null;
    }

    App.accessibilityEventsEnabled = true;
  }
}
