import { fetchSpaListener } from "../utils/fetchSpaListener.js";

export const photographerTemplate = (data) => {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    const getUserCardDOM = () => {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const link = document.createElement( 'a' );
        link.setAttribute("href", `photographer.html?id=${data.id}`);
        link.appendChild(img);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(link);
        article.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}

export const listenerPhotographerLinks = (App, links) => {
    links.forEach(link => {
        fetchSpaListener(link, App)
    })
}