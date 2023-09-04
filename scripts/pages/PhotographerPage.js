import Media from "../models/Media.js";
import { expoTemplate } from "../templates/expo.js";
import Page from "./Page.js";



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

    displayExpo (medias, photographer) {
        // for of plus rapide que forEach
        for (const media of medias) {
            const mediaModel = expoTemplate(media, photographer);
            const userCardDOM = mediaModel.getUserCardDOM();
            this.$expoWrapper.appendChild(userCardDOM);
        }
    }

    displayPhotographerData (photographer) {
    }

    removeNavNosPhotographe() {
        document.querySelector('header h1') && document.querySelector('header h1').remove()
    }

    async main() {
        await this.getPhotographer()
        await this.getMedias()
    //    this.displayPhotographer(this.photographer)
        this.displayExpo(this.medias, this.photographer)
        this.removeNavNosPhotographe()

    }
}

export default PhotographerPage;

