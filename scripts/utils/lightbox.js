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
    prev.classList.add("prev");
    prev.textContent = "prev";
    const next = document.createElement("a");
    next.classList.add("next");
	newLightbox.appendChild(lightboxContent);
    newLightbox.appendChild(prev);
    newLightbox.appendChild(next);
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
    // var dots = document.getElementsByClassName("demo");
    // var captionText = document.getElementById("caption");
    console.log(slides, n);
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    // for (i = 0; i < dots.length; i++) {
    //   dots[i].className = dots[i].className.replace(" active", "");
    // }
    slides[slideIndex-1].style.display = "block";
    console.log(slides[slideIndex-1]);
    // dots[slideIndex-1].className += " active";
    // captionText.innerHTML = dots[slideIndex-1].alt;
  }

  export const currentSlide = (n) => {
    showSlides(n);
  }
