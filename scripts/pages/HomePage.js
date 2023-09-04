import { listenerPhotographerLinks, photographerTemplate } from "../templates/photographer.js";
import Page from "./Page.js";


class HomePage extends Page {
    
    constructor(photographers, App) {
        super(App)
        this.$photographersWrapper = document.querySelector('.photographer_section')
        this.photographers = photographers
    }

    displayData (photographers) {
        photographers.forEach(photographer => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            this.$photographersWrapper.appendChild(userCardDOM);
        })
    }

    displayNavNosPhotographe() {
        !document.querySelector('header h1') && document.querySelector('header').insertAdjacentHTML('beforeend', '<h1>Nos photographes</h1>')
    }

    async main() {
        this.displayData(this.photographers)
        const $links = document.querySelectorAll('article a')
        listenerPhotographerLinks(this.App, $links)
        this.displayNavNosPhotographe()
    }
}

export default HomePage;



