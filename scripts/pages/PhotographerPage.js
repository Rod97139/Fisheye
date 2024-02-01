import Media from "../models/Media.js";
import { 
    // expoImageTemplate,
     expoPhotographerTemplate } from "../templates/expo.js";
import Page from "./Page.js";
import { displayModal } from "../utils/contactForm.js";
import { currentSlide, displayLightbox } from "../utils/lightbox.js";
import MediaFactory from "../factory/mediaFactory.js";
// import MediaFactory from "../factory/mediaFactory.js";




class PhotographerPage extends Page {

    constructor(id, photographers, App) {
        super(App)
        this.photographerId = id;
        this.photographers = photographers
        this.$expoWrapper = document.querySelector('.expo_section')
        this.medias = []
        this.displaiedMedia = null 
    }

    async getPhotographer() {
        // une methode plus rapide que filter pour trouver le photographe   
        this.photographer = this.photographers.find((photographer) => photographer.id == this.photographerId);
    }
    
    async getMedias() {
        this.medias = JSON.parse(window.localStorage.getItem(`media-${this.photographerId}`));
        // const localMedias = JSON.parse(window.localStorage.getItem(`media-${this.photographerId}`));
        // this.medias = localMedias
        //     .map(media => new Media(media))
    }

    async displayExpo (medias, photographer) {
        // for of plus rapide que forEach
        displayLightbox(photographer.id)
        const lightboxContent = document.querySelector('.lightbox-content')
        const myArray = this.photographer.name.split(" ");
        const firstName = myArray[0];
        
        for (const media of medias) {

            const temp = new Media(media);
            const mediaModel = new MediaFactory(temp, photographer);
            // lightboxContent.innerHTML += `<div class="mySlides">
            //                                 <img src="assets/media/${firstName}/${temp.bigFile}">
            //                                 <a class="prev">prev</a>
            //                                 <a class="next">next</a>
            //                               </div>`
            const lightboxDOM = mediaModel.getLightboxDOM();
            lightboxContent.appendChild(lightboxDOM);

            // const mediaModel = expoImageTemplate(temp, photographer);

            const expoCardDOM = mediaModel.getExpoCardDOM();
            // console.log(mediaModel.getExpoCardDOM);
            this.$expoWrapper.appendChild(expoCardDOM);
        }
    }

    async displayPhotographerData (photographer) {
        const photographerModel = expoPhotographerTemplate(photographer);
        const expoPhotographerCardDOM = photographerModel.getExpoPhotographerCardDOM();
        const $expoPhotographerWrapper = document.querySelector('.photograph-header')
        $expoPhotographerWrapper.appendChild(expoPhotographerCardDOM);
    }

    async removeNavNosPhotographe() {
        document.querySelector('header h1') && document.querySelector('header h1').remove()
    }

    async handleLightbox () {
        const lightbox = document.querySelector('#myLightbox')
        const urlParams = new URLSearchParams(window.location.search);
        const media = urlParams.get('media')
        this.displaiedMedia = media
        
        if (media) {
            currentSlide(media)
            lightbox.style.display = 'block'
        }
        
        const $mediaCards = document.querySelectorAll('.expo_section article')
        let i = 0
        const $mySlides = document.querySelectorAll('.mySlides')
        for (const $mediaCard of $mediaCards) {
            ++i
            const prevButton = $mySlides[i-1].querySelector('.prev')
            const nextButton = $mySlides[i-1].querySelector('.next')

            prevButton.addEventListener('click', ((index) => {
                return () => {
                    let slideIndex = parseInt(index) - 1;
                    currentSlide(slideIndex)
                    if (slideIndex < 1) {slideIndex = $mediaCards.length}
                    history.pushState({}, '', `?id=${this.photographerId}&media=${slideIndex}`)
                    this.displaiedMedia = slideIndex
                }
            })(i))
            
            nextButton.addEventListener('click', ((index) => {
                return () => {
                    let slideIndex = parseInt(index) + 1;
                    currentSlide(slideIndex)
                    if (slideIndex > $mediaCards.length) {slideIndex = 1}
                    history.pushState({}, '', `?id=${this.photographerId}&media=${slideIndex}`)
                    this.displaiedMedia = slideIndex
                }
            })(i))

            $mediaCard.addEventListener('click', ((index) => {
                return () => {
                    currentSlide(index)
                    lightbox.style.display = 'block'
                    history.pushState({}, '', `?id=${this.photographerId}&media=${index}`)
                    this.displaiedMedia = index
                }
            })(i)) // closure pour regler probleme de scope/portée
        }
    }

    async handleModalForm () {
        const $contactBtn = document.querySelector('.contact_button')
        $contactBtn.addEventListener('click', () => {
            const modal = displayModal()
            const $closeBtn = document.querySelector('.modal img')
            $closeBtn.addEventListener('click', () => {
                modal.style.display = 'none'
            })
        })
    }

    async main() {
        await this.getPhotographer()
        await this.getMedias()
        this.displayExpo(this.medias, this.photographer)
        this.removeNavNosPhotographe()
        this.displayPhotographerData(this.photographer)
        this.handleModalForm()
        this.handleLightbox ()  
    }
}

export default PhotographerPage;

