import Media from "../models/Media.js";
import Photographer from "../models/Photographer.js";
import { expoTemplate } from "../templates/Expo.js";
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
        let localPhotographers = this.photographers
        this.photographer = new Photographer(localPhotographers.filter((photographer) => photographer.id == this.photographerId)[0]);
    }
    
    async getMedias() {
        let localMedias = window.localStorage.getItem(`media-${this.photographerId}`);
        localMedias = JSON.parse(localMedias);
        this.medias = localMedias.map(media => new Media(media))
    }

    displayExpo (medias, photographer) {
        medias.forEach(media => {
            const mediaModel = expoTemplate(media, photographer);
            const userCardDOM = mediaModel.getUserCardDOM();
            this.$expoWrapper.appendChild(userCardDOM);
        })
    }

    displayPhotographer (photographer) {
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

