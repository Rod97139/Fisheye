export const expoTemplate = (data, photographer) => {
    const { title, file } = data;
    
    const myArray = photographer.name.split(" ");
    const firstName = myArray[0];
    const picture = `assets/media/${firstName}/${file}`;

    const getUserCardDOM = () => {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = title;
        article.appendChild(h2);
        article.appendChild(img);
        return (article);
    }
    return { title, picture, getUserCardDOM }
}