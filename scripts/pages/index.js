import { photographerTemplate } from "../templates/photographer.js";

    const saveToLocalStorage = async (data) => {
        window.localStorage.setItem("photographers", JSON.stringify(data.photographers));
        const photosByPhotographer = {} 
        let lastId = null;
        data.media.forEach((media) => {
            if (!photosByPhotographer[media.photographerId]) {
                if (lastId) {
                    window.localStorage.setItem(`media-${lastId}`, JSON.stringify(photosByPhotographer[lastId])); 
                }
                photosByPhotographer[media.photographerId] = [];
            }
            photosByPhotographer[media.photographerId].push(media);
            lastId = media.photographerId;
            
        });
        window.localStorage.setItem(`media-${lastId}`, JSON.stringify(photosByPhotographer[lastId])); 
    }


    const getPhotographers = async () => {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        
        let photographers = window.localStorage.getItem("photographers");

        if (!photographers) {
            const data = await fetch("data/photographers.json").then(data => data.json());
            saveToLocalStorage(data);
            photographers = data.photographers;
        } else {
            photographers = JSON.parse(photographers);
        }
        // et bien retourner le tableau photographers seulement une fois récupéré
        return ({
            photographers: [...photographers]})
    }

    const displayData = (photographers) => {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    const init = async () => {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
