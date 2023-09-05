export const expoTemplate = (data, photographer) => {
    const { title, file } = data;
    
    const myArray = photographer.name.split(" ");
    const firstName = myArray[0];
    const picture = `assets/media/${firstName}/${file}`;

    const getExpoCardDOM = () => {
        const article = document.createElement( 'article' );

        // The same code in the end of the function to fill the article in jsx:
        article.innerHTML = `<img src="${picture}" alt="${title}">
                                <h2>${title}</h2>`;
                                
        return (article);
    }
    return { title, picture, getExpoCardDOM }
}

export const expoPhotographerTemplate = (data) => {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    const getExpoPhotographerCardDOM = () => {
        const article = document.createElement( 'article' );
        article.innerHTML = `   <h1>${name}</h1>
                                <p>${data.city}, ${data.country}</p>
                                <p>${data.tagline}</p>
                                <p>${data.price}€/jour</p>`;

        return (article);
    }
    return { name, picture, getExpoPhotographerCardDOM }
}