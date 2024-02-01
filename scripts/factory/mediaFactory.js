// import { expoImageTemplate } from "../templates/expo";

class MediaFactory {
        constructor(data, photographer) {

                // console.log(expoImageTemplate(data, photographer));
                // Si le type correspond à l'ancienne API, alors retourne-moi l'ancien formatage
                if (data.image) {
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
                // Sinon retourne-moi le nouveau formatage
                } else if (data.video) {
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
                // Une bonne pratique est de déclencher une erreur si le format n'est pas reconnu
                } else {
                throw 'Unknown type format'
                }
        };
}

export default MediaFactory;