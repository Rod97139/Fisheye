import DataApi from "./api/DataApi.js";
import Photographer from "./models/Photographer.js";
import { saveToLocalStorage } from "./api/localStorage.js";
import PhotographerPage from "./pages/Photographer.js";
import HomePage from "./pages/Home.js";


class App {

    constructor() {
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

    async checkUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const pathName = window.location.pathname

        if (window.location.pathname === '/photographer.html') {
            if (urlParams.get('id')) {
                const photographerId = urlParams.get('id');
                const photographerPage = new PhotographerPage(photographerId, this.photographers);
                photographerPage.main();

                const links = document.querySelectorAll('a')
                links.forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault()
                        const url = link.getAttribute('href')
                        history.pushState({}, null, url)
                        
                        fetch(url, {
                            method: "get"
                        })
                        .then(res => res.text())
                        .then(html => {
                            let content = document.createElement("html")
                            content.innerHTML = html
                            let oldContent = document.querySelector("html") 
                            
                
                            oldContent.innerHTML = html
                            this.checkUrl()
                            
                        })    
                    })
                })
            }
        } else {
            const homePage = new HomePage(this.photographers)
            await homePage.main()

            const links = document.querySelectorAll('a')
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault()
                    const url = link.getAttribute('href')
                    history.pushState({}, null, url)
                    
                    fetch(url, {
                        method: "get"
                    })
                    .then(res => res.text())
                    .then(html => {
                        let content = document.createElement("html")
                        content.innerHTML = html
                        let oldContent = document.querySelector("html") 
                        
            
                        oldContent.innerHTML = html
                        this.checkUrl()
                        
                    })    
                })
            })
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
                let oldContent = document.querySelector("html") 
                oldContent.innerHTML = html
                this.checkUrl()
            })
        }

        // export const createScriptElement: (url: string) => HTMLScriptElement = url => {
        //     const element: HTMLScriptElement = document.createElement('script');
        //     element.setAttribute('src', url);
        //     element.setAttribute('type', 'text/javascript');
          
        //     return element;
        //   };
          


    }
}

const app = new App()
app.main()

