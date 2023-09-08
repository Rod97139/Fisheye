import Media from "../models/Media.js";
import { expoPhotographerTemplate, expoTemplate } from "../templates/expo.js";
import Page from "./Page.js";
import { displayModal } from "../utils/contactForm.js";



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
        const localMedias = JSON.parse(window.localStorage.getItem(`media-${this.photographerId}`));
        this.medias = localMedias.map(media => new Media(media))
    }

    async displayExpo (medias, photographer) {
        // for of plus rapide que forEach
        for (const media of medias) {
            const mediaModel = expoTemplate(media, photographer);
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
        const $mediaCards = document.querySelectorAll('.expo_section article')

        for (const $mediaCard of $mediaCards) {
            $mediaCard.addEventListener('click', () => {
                console.log('click')
                // const lightbox = displayLightbox()
                // const $closeBtn = document.querySelector('.lightbox img')
                // $closeBtn.addEventListener('click', () => {
                //     lightbox.style.display = 'none'
                // })
            })
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

