import { fetchSpaListener } from "../utils/fetchSpaListener.js";

export const photographerTemplate = (data) => {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    const getUserCardDOM = () => {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)
        img.classList.add('photographer_img')
        const link = document.createElement( 'a' );
        link.setAttribute("href", `photographer.html?id=${data.id}`);
        link.appendChild(img);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const info = document.createElement( 'div' );
        info.classList.add('info');
        const location = document.createElement( 'p' );
        location.textContent = `${data.city}, ${data.country}`;
        const tagline = document.createElement( 'p' );
        tagline.textContent = data.tagline;
        const price = document.createElement( 'p' );
        price.textContent = `${data.price}€/jour`;
        info.appendChild(location);
        info.appendChild(tagline);
        info.appendChild(price);
        article.appendChild(info);
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