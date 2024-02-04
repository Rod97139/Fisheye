// import { expoImageTemplate } from "../templates/expo";
// import { sortBy } from "../utils/sorter";

class MediaFactory {
        constructor(data, photographer) {

                // console.log(expoImageTemplate(data, photographer));
                // Si le type correspond à l'ancienne API, alors retourne-moi l'ancien formatage
                if (data.image) {
                const { title, file, bigFile } = data;

                const myArray = photographer.name.split(" ");
                const firstName = myArray[0];
                const picture = `assets/media/${firstName}/${file}`;
                
                const getExpoCardDOM = () => {
                        const article = document.createElement( 'article' );
                        const btn = document.createElement( 'button' );
                        const img = document.createElement( 'img' );
                        img.setAttribute("src", picture)
                        img.setAttribute("alt", title)
                        img.classList.add('expo_img')
                        const pictureTitle = document.createElement( 'h2' );
                        pictureTitle.textContent = title;
                        btn.appendChild(img);
                        article.appendChild(btn);
                        article.appendChild(pictureTitle);
                
                        return (article);
                }

                const getLightboxDOM = () => {
                        const mySlides = document.createElement( 'div' );
                        mySlides.classList.add('mySlides');
                        const img = document.createElement( 'img' );
                        img.setAttribute("src", `assets/media/${firstName}/${bigFile}`)
                        img.setAttribute("alt", title)
                        mySlides.appendChild(img);
                        const prev = document.createElement( 'a' );
                        prev.classList.add('prev');
                        prev.textContent = 'prev';
                        mySlides.appendChild(prev);
                        const next = document.createElement( 'a' );
                        next.classList.add('next');
                        next.textContent = 'next';
                        mySlides.appendChild(next);

                        return (mySlides);
                }

                return { title, picture, getExpoCardDOM, getLightboxDOM }
                // Sinon retourne-moi le nouveau formatage
                } else if (data.video) {
                        const { title, file } = data;

                        const myArray = photographer.name.split(" ");
                        const firstName = myArray[0];
                        const picture = `assets/media/${firstName}/${file}`;
                        
                        const getExpoCardDOM = () => {
                                const article = document.createElement( 'article' );
                                const btn = document.createElement( 'button' );
                                const video = document.createElement( 'video' );
                                video.setAttribute("src", picture)
                                video.setAttribute("alt", title)
                                video.classList.add('expo_video')
                                const pictureTitle = document.createElement( 'h2' );
                                pictureTitle.textContent = title;
                                btn.appendChild(video);
                                article.appendChild(btn);
                                article.appendChild(pictureTitle);
                        
                                return (article);
                        }

                        const getLightboxDOM = () => {
                                const mySlides = document.createElement( 'div' );
                                mySlides.classList.add('mySlides');
                                
                                const video = document.createElement( 'video' );
                                video.setAttribute("src", picture)
                                video.setAttribute("alt", title)
                                video.setAttribute("controls", true)
                                mySlides.appendChild(video);
                                const prev = document.createElement( 'a' );
                                prev.classList.add('prev');
                                prev.textContent = 'prev';
                                mySlides.appendChild(prev);
                                const next = document.createElement( 'a' );
                                next.classList.add('next');
                                next.textContent = 'next';
                                mySlides.appendChild(next);
        
                                return (mySlides);
                        }

                        return { title, picture, getExpoCardDOM, getLightboxDOM }
                        
                // Une bonne pratique est de déclencher une erreur si le format n'est pas reconnu
                } else {
                throw 'Unknown type format'
                }
        };
}

export default MediaFactory;