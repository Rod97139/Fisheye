import { photographerTemplate } from "../templates/photographer.js";


class HomePage {
    
    constructor(photographers) {
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

    async main() {
        this.displayData(this.photographers)
    }
}

export default HomePage;



