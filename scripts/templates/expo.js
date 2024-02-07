
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

export const expoPhotographerTemplate = (App, data) => {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    const getExpoPhotographerCardDOM = () => {
        const article = document.createElement( 'article' );
        article.setAttribute("aria-label", "Photographer Info");   
        article.classList.add('photographer_info');
        const photographerName = document.createElement( 'h1' );
        photographerName.classList.add('photographer_info_name');
        photographerName.textContent = name;
        const location = document.createElement( 'p' );
        location.classList.add('photographer_info_location');
        location.textContent = `${data.city}, ${data.country}`;
        const tagline = document.createElement( 'p' );
        tagline.classList.add('photographer_info_tagline');
        tagline.textContent = data.tagline;
        const price = document.createElement( 'p' );
        price.classList.add('photographer_info_price');
        price.textContent = `${data.price}€/jour`;
        const totalLikes = document.createElement( 'p' );
        totalLikes.classList.add('likeTotal');
        totalLikes.textContent = App.totalLikes;
        const likesSection = document.createElement( 'section' );
        likesSection.classList.add('fixed-likes-price');
        likesSection.appendChild(totalLikes);
        likesSection.appendChild(price);
        const main = document.querySelector('main');
        main.appendChild(likesSection);


        article.appendChild(photographerName);
        article.appendChild(location);
        article.appendChild(tagline);

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
        if (option === 'likes') {
            optionDOM.textContent = 'Popularité';
            
        } else if (option === 'date') {
            optionDOM.textContent = 'Date';
        } else {
            optionDOM.textContent = 'Titre';
        }
        select.appendChild(optionDOM);
        if (option === Page.sortBy) {
            optionDOM.setAttribute('selected', true);
        }
    }
    return select;
}   

export const expoCustomSelectTemplate = (App) => {
    const options = ['likes', 'date', 'title'];
    const inexOfSlected = options.indexOf(App.sortBy);
    let indexOfFirst;
    let indexOfSecond;
    if (inexOfSlected === 0) {
        indexOfFirst = 1;
        indexOfSecond = 2;
    } else if (inexOfSlected === 1) {
        indexOfFirst = 0;
        indexOfSecond = 2;
    } else {
        indexOfFirst = 0;
        indexOfSecond = 1;
    }
    const optionsFr = ['Popularité', 'Date', 'Titre'];
    inexOfSlected > -1 ? options.splice(inexOfSlected, 1) : false;
    const newSelect = document.createElement( 'div' );
    newSelect.classList.add('custom-select');
    const selected = document.createElement( 'button' );
    selected.classList.add('custom-select-selected');

    selected.textContent = optionsFr[inexOfSlected];
    
    inexOfSlected > -1 ? optionsFr.splice(inexOfSlected, 1) : false;
    newSelect.appendChild(selected);
    const optionsDiv = document.createElement( 'div' );
    optionsDiv.classList.add('custom-select-options');
    selected.addEventListener('click', () => {
        optionsDiv.style.display = optionsDiv.style.display === 'block' ? 'none' : 'block';
    })
    const firstOption = document.createElement( 'button' );
    
    firstOption.classList.add('custom-select-options-first');
    firstOption.textContent = optionsFr[0];
    firstOption.addEventListener('click', () => {
        selectChangeEvent(indexOfFirst);
    })
    const secondOption = document.createElement( 'button' );
    secondOption.classList.add('custom-select-options-second');
    secondOption.textContent = optionsFr[1];
    secondOption.addEventListener('click', () => {
        selectChangeEvent(indexOfSecond);
    })
    optionsDiv.appendChild(firstOption);
    optionsDiv.appendChild(secondOption);
    newSelect.appendChild(optionsDiv);

    return newSelect;

}

export const selectChangeEvent = (index) => {
    const select = document.querySelector('#sorter');
    select.selectedIndex = index;
    select.dispatchEvent(new Event('change'));
}