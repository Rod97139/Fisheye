// import { expoTemplate } from "../templates/Expo";

import DataApi from "../api/DataApi.js";
import { saveToLocalStorage } from "../api/localStorage.js";
import Media from "../models/Media.js";
import { expoTemplate } from "../templates/Expo.js";



class App {
    constructor() {
        const urlParams = new URLSearchParams(window.location.search);
        this.photographerId = urlParams.get('id');
        this.$expoWrapper = document.querySelector('.expo_section')
        this.dataApi = new DataApi('data/photographers.json')
        this.medias = []
    }


    
    async getPhotographer() {
        let localPhotographers = window.localStorage.getItem("photographers");
        if (!localPhotographers) {
            const data = await this.dataApi.get()
            saveToLocalStorage(data)
            localPhotographers = data.photographers;
        }else {
            localPhotographers = JSON.parse(localPhotographers);
        }
        this.photographer = localPhotographers.filter((photographer) => photographer.id == this.photographerId)[0];
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

    async main() {
        await this.getPhotographer()
        await this.getMedias()
    //    this.displayPhotographer(this.photographer)
       this.displayExpo(this.medias, this.photographer)
       console.log(this.medias[6].file)
    }
}

const app = new App()
app.main()




