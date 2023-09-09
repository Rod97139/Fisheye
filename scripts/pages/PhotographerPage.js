import Media from "../models/Media.js";
import { expoPhotographerTemplate, expoTemplate } from "../templates/expo.js";
import Page from "./Page.js";
import { displayModal } from "../utils/contactForm.js";
import { currentSlide, displayLightbox } from "../utils/lightbox.js";



class PhotographerPage extends Page {

    constructor(id, photographers, App) {
        super(App)
        this.photographerId = id;
        this.photographers = photographers
        this.$expoWrapper = document.querySelector('.expo_section')
        this.medias = []
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
        displayLightbox()
        const lightboxContent = document.querySelector('.lightbox-content')
        const myArray = this.photographer.name.split(" ");
        const firstName = myArray[0];
        for (const media of medias) {
            
            
            const temp = new Media(media);
            lightboxContent.innerHTML += `<div class="mySlides">
            <img src="assets/media/${firstName}/${temp.file}" style="width:100%">
          </div>`

            const mediaModel = expoTemplate(temp, photographer);
            const expoCardDOM = mediaModel.getExpoCardDOM();
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

        const $mediaCards = document.querySelectorAll('.expo_section article')
        
        let i = 0

        for (const $mediaCard of $mediaCards) {
            ++i
            console.log(i);

            

            $mediaCard.addEventListener('click', ((index) => {

                return () => {
                
                console.log(index);
                currentSlide(index)
                lightbox.style.display = 'block'
                console.log('click')
                }
                
                // const $closeBtn = document.querySelector('.lightbox img')
                // $closeBtn.addEventListener('click', () => {
                //     lightbox.style.display = 'none'
                // })
            })(i)) // closure pour regler probleme de scope
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
        //    this.displayPhotographer(this.photographer)
        this.displayExpo(this.medias, this.photographer)
        this.removeNavNosPhotographe()
        this.displayPhotographerData(this.photographer)
        this.handleModalForm()
        this.handleLightbox ()  
    }
}

export default PhotographerPage;

