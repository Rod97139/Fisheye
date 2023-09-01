import DataApi from "../api/DataApi.js";
import { photographerTemplate } from "../templates/photographer.js";
import Photographer from "../models/Photographer.js";
import { saveToLocalStorage } from "../api/localStorage.js";


class App {
    constructor() {
        this.$photographersWrapper = document.querySelector('.photographer_section')
        this.dataApi = new DataApi('data/photographers.json')
        this.photographers = []
    }


    async getPhotographers() {
        let localPhotographers = window.localStorage.getItem("photographers");
        if (!localPhotographers) {
            const data = await this.dataApi.get()
            saveToLocalStorage(data)
            localPhotographers = data.photographers;
        }else {
            localPhotographers = JSON.parse(localPhotographers);
        }
        this.photographers = localPhotographers.map(photographer => new Photographer(photographer))
    }

    displayData (photographers) {
        photographers.forEach(photographer => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            this.$photographersWrapper.appendChild(userCardDOM);
        })
    }

    async main() {
        await this.getPhotographers()
        this.displayData(this.photographers)


        // fetch("photographer.html?id=195", {
        //     method: "get"
        //     })
        //     .then(res => res.text())
        //     .then(html => {
        //         let content = document.createElement("html")
        //         content.innerHTML = html
        //         let oldContent = document.querySelector("html") 
                
    
        //         oldContent.innerHTML = html
        //         console.log(oldContent);
        //     })    
    }
}

const app = new App()
app.main()

