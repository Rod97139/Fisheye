import { fetchSpaListener } from "../utils/fetchSpaListener.js";

export const photographerTemplate = (data) => {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    const getUserCardDOM = () => {
        const article = document.createElement( 'article' );
        article.classList.add('photographer_card');
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)
        img.setAttribute("role", "img")
        img.classList.add('photographer_img')
        img.classList.add('photographer_card_img')
        const link = document.createElement( 'a' );
        link.setAttribute("href", `photographer.html?id=${data.id}`);
        link.setAttribute("role", "link")
        link.appendChild(img);
        const h2 = document.createElement( 'h2' );
        h2.classList.add('photographer_card_info_name');
        h2.textContent = name;
        const info = document.createElement( 'div' );
        info.classList.add('photographer_card_info');
        info.setAttribute("role", "info");
        info.setAttribute("aria-label", "informations sur le photographe");
        const location = document.createElement( 'p' );
        location.classList.add('photographer_card_info_location');
        location.textContent = `${data.city}, ${data.country}`;
        const tagline = document.createElement( 'p' );
        tagline.classList.add('photographer_card_info_tagline');
        tagline.textContent = data.tagline;
        const price = document.createElement( 'p' );
        price.classList.add('photographer_card_info_price');
        price.textContent = `${data.price}€/jour`;
        info.appendChild(h2);
        info.appendChild(location);
        info.appendChild(tagline);
        info.appendChild(price);
        article.appendChild(link);
        article.appendChild(info);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}

export const listenerPhotographerLinks = (App, links) => {
    links.forEach(link => {
        fetchSpaListener(link, App)
    })
}