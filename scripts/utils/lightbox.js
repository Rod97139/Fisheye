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
