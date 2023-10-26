import DataApi from "./api/DataApi.js";
// import Photographer from "./models/Photographer.js";
import { saveToLocalStorage } from "./api/localStorage.js";
import PhotographerPage from "./pages/PhotographerPage.js";
import HomePage from "./pages/HomePage.js";
import { accessibilityEvents, currentSlide} from "./utils/lightbox.js";


class App {

    constructor() {
        this.dataApi = new DataApi('data/photographers.json')
        this.photographers = []
        this.routes = {
            '/Fisheye/' : () => this.displayhomePage(),
            '/Fisheye/index.html' : () => this.displayhomePage(),
            '/Fisheye/photographer.html' : () => this.displayPhotographerPage()
        }
        this.accessibilityEventsEnabled = false
    }

    async getPhotographers() {
        const photographersStorage = window.localStorage.getItem("photographers");
        if (!photographersStorage) {
            const data = await this.dataApi.get()
            saveToLocalStorage(data)
            return data.photographers;
        }else {
            return JSON.parse(photographersStorage);
        }
        // pas obligatoire ... pour l'instant 
        // this.photographers = localPhotographers.map(photographer => new Photographer(photographer))
    }

    async checkUrl(url = window.location.pathname) {
        this.routes[url]()
        this.page.main()
        this.page.handleNavBarListener()
    }

    async displayhomePage() {
        this.page = new HomePage(this.photographers, this)
        this.page.displaiedMedia = null
    }

    async displayPhotographerPage() {
        const urlParams = new URLSearchParams(window.location.search);
        const photographerId = urlParams.get('id');
        // retourner true ou false si l'id du photographe existe dans le tableau des photographes
        const photographerExist = this.photographers.some(photographer => photographer.id === parseInt(photographerId))
        // Si l'id du photographe existe, on instancie la page du photographe, sinon on redirige vers la page d'accueil
        photographerExist ? this.page = new PhotographerPage(photographerId, this.photographers, this) : document.location.href = 'index.html'

        accessibilityEvents(this)
    }

    async main() {
        
        this.photographers = await this.getPhotographers() 
        await this.checkUrl()

        // Le referrer est vide ou invalide lorsque l'utilisateur clique sur prédédent ou suivant
        window.onpopstate = () => {
            const url = window.location.href
            fetch(url, {
                method: "get"
            })
            .then(res => res.text())
            .then(html => {
                const newContent = document.createElement("html")
                newContent.innerHTML = html
                const oldContent = document.querySelector("main") 
                oldContent.replaceWith(newContent.querySelector("main"))  
                this.checkUrl()
            })
        }
    }
}

const app = new App()
app.main()

