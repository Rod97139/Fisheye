
export const expoImageTemplate = (data, photographer) => {
    const { title, file } = data;
    
    const myArray = photographer.name.split(" ");
    const firstName = myArray[0];
    const picture = `assets/media/${firstName}/${file}`;

    const getExpoCardDOM = () => {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", title)
        img.classList.add('expo_img')
        const pictureTitle = document.createElement( 'h2' );
        pictureTitle.textContent = title;
        article.appendChild(img);
        article.appendChild(pictureTitle);

        return (article);
    }
    return { title, picture, getExpoCardDOM }
}

// export const expoVideoTemplate = (data, photographer) => {
//     const { title, file } = data;
    
//     const myArray = photographer.name.split(" ");
//     const firstName = myArray[0];
//     const picture = `assets/media/${firstName}/${file}`;

//     const getExpoCardDOM = () => {
//         const article = document.createElement( 'article' );
        
//         article.innerHTML = `<video src="${picture}" class="expo_img" alt="${title}" controls>
//                                 <h2>${title}</h2>
//                             </video>`;
                                
//         return (article);
//     }
//     return { title, picture, getExpoCardDOM }
// }

export const expoPhotographerTemplate = (data) => {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    const getExpoPhotographerCardDOM = () => {
        const article = document.createElement( 'article' );
        const photographerName = document.createElement( 'h1' );
        photographerName.textContent = name;
        const location = document.createElement( 'p' );
        location.textContent = `${data.city}, ${data.country}`;
        const tagline = document.createElement( 'p' );
        tagline.textContent = data.tagline;
        const price = document.createElement( 'p' );
        price.textContent = `${data.price}€/jour`;
        article.appendChild(photographerName);
        article.appendChild(location);
        article.appendChild(tagline);
        article.appendChild(price);

        return (article);
    }
    return { name, picture, getExpoPhotographerCardDOM }
}

export const expoSorterTemplate = (Page) => {
    const select = document.createElement( 'select' );
    select.id = 'sorter';
    const options = ['likes', 'date', 'title'];
    for (const option of options) {
        const optionDOM = document.createElement( 'option' );
        optionDOM.value = option;
        optionDOM.textContent = option;
        select.appendChild(optionDOM);
        if (option === Page.sortBy) {
            optionDOM.setAttribute('selected', true);
        }
        // optionDOM.addEventListener('click', (e) => {
        //     // sortBy(this.medias, e.target.value)
        // })
    }
    return select;
}   