import DataApi from "./api/DataApi.js";
import Photographer from "./models/Photographer.js";
import { saveToLocalStorage } from "./api/localStorage.js";
import PhotographerPage from "./pages/PhotographerPage.js";
import HomePage from "./pages/HomePage.js";


class App {

    constructor() {
        this.dataApi = new DataApi('data/photographers.json')
        this.photographers = []
        this.routes = {
            '/' : () => this.displayhomePage(),
            '/index.html' : () => this.displayhomePage(),
            '/photographer.html' : () => this.displayPhotographerPage()
        }
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

    async checkUrl() {
        this.routes[window.location.pathname]()
        this.page.handleNavBarListener()
    }

    async displayhomePage() {
        this.page = new HomePage(this.photographers, this)
            await this.page.main()
    }


    async displayPhotographerPage() {
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.get('id')) {
            const photographerId = urlParams.get('id');
            this.page = new PhotographerPage(photographerId, this.photographers, this);
            this.page.main();


        } else   {
            this.displayhomePage()
        }
    }

    async main() {
        
        await this.getPhotographers()
        await this.checkUrl()
        
        window.onpopstate = () => {
            const url = window.location.href
            fetch(url, {
                method: "get"
            })
            .then(res => res.text())
            .then(html => {
                let newContent = document.createElement("html")
                newContent.innerHTML = html
                let oldContent = document.querySelector("main") 
                oldContent.replaceWith(newContent.querySelector("main"))  
                this.checkUrl()
            })
        }
    }
}

const app = new App()
app.main()

