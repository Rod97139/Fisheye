// import { expoImageTemplate } from "../templates/expo";
// import { sortBy } from "../utils/sorter";

class MediaFactory {
        constructor(data, photographer) {

                // Si le type correspond à l'ancienne API, alors retourne-moi l'ancien formatage
                if (data.image) {
                const { title, file, bigFile, likes } = data;

                const myArray = photographer.name.split(" ");
                const firstName = myArray[0];
                const picture = `assets/media/${firstName}/${file}`;
                
                const getExpoCardDOM = () => {
                        const article = document.createElement( 'article' );
                        article.classList.add('expo_wrapper_card');
                        const btn = document.createElement( 'button' );
                        btn.classList.add('expo_wrapper_card_btn');
                        const img = document.createElement( 'img' );
                        img.classList.add('expo_wrapper_card_btn_img');
                        img.setAttribute("src", picture)
                        img.setAttribute("alt", title)
                        img.classList.add('expo_img')
                        const pictureTitle = document.createElement( 'h2' );
                        pictureTitle.classList.add('expo_wrapper_card_info_title');
                        pictureTitle.textContent = title;


                        const $like = document.createElement('p');
                        $like.classList.add('expo_wrapper_card_info_like_number');
                        $like.classList.add('like');
                        $like.textContent = likes;

                        
                                const likeIcon = document.createElement('img')
                                likeIcon.classList.add('expo_wrapper_card_info_like_icon')
                                likeIcon.src = 'assets/icons/like.svg'
                                const likeDiv = document.createElement('div')
                                likeDiv.classList.add('expo_wrapper_card_info_like')
                                likeDiv.appendChild($like)
                                likeDiv.appendChild(likeIcon)


                                if (data.isLiked) {
                                        likeIcon.classList.add('liked')
                                        likeIcon.src = 'assets/icons/liked.svg'
                                }


                        btn.appendChild(img);
                        article.appendChild(btn);

                        const infoMedia = document.createElement('div');
                        infoMedia.classList.add('expo_wrapper_card_info');
                        infoMedia.appendChild(pictureTitle);
                        infoMedia.appendChild(likeDiv);
                        article.appendChild(infoMedia);
                        
                
                        return (article);
                }

                const getLightboxDOM = () => {
                        const mySlides = document.createElement( 'div' );
                        mySlides.classList.add('mySlides');
                        mySlides.dataset.title = title;
                        const img = document.createElement( 'img' );
                        img.setAttribute("src", `assets/media/${firstName}/${bigFile}`)
                        img.setAttribute("alt", title)
                        img.setAttribute("role", "img")
                        mySlides.appendChild(img);
                        const prev = document.createElement( 'a' );
                        prev.classList.add('prev');
                        prev.textContent = 'prev';
                        mySlides.appendChild(prev);
                        const next = document.createElement( 'a' );
                        next.classList.add('next');
                        next.textContent = 'next';
                        mySlides.appendChild(next);
                        const close = document.createElement( 'a' );
                        close.classList.add('close');
                        close.textContent = 'close';
                        mySlides.appendChild(close);

                        return (mySlides);
                }

                return { title, picture, getExpoCardDOM, getLightboxDOM }
                // Sinon retourne-moi le nouveau formatage
                } else if (data.video) {
                        const { title, file, likes } = data;

                        const myArray = photographer.name.split(" ");
                        const firstName = myArray[0];
                        const picture = `assets/media/${firstName}/${file}`;
                        
                        const getExpoCardDOM = () => {
                                const article = document.createElement( 'article' );
                                article.classList.add('expo_wrapper_card');
                                const btn = document.createElement( 'button' );
                                btn.classList.add('expo_wrapper_card_btn');

                                const video = document.createElement( 'video' );
                                video.classList.add('expo_wrapper_card_btn_img');
                                video.setAttribute("src", picture)
                                video.setAttribute("alt", title)
                                video.classList.add('expo_video')
                                const pictureTitle = document.createElement( 'h2' );
                                pictureTitle.textContent = title;
                                pictureTitle.classList.add('expo_wrapper_card_info_title');

                                const $like = document.createElement('p');
                                $like.classList.add('like');
                                $like.textContent = likes;
                                $like.classList.add('expo_wrapper_card_info_like_number');

                                        const likeIcon = document.createElement('img')
                                        likeIcon.classList.add('expo_wrapper_card_info_like_icon')
                                        likeIcon.src = 'assets/icons/like.svg'
                                        const likeDiv = document.createElement('div')
                                        likeDiv.classList.add('expo_wrapper_card_info_like')
                                        likeDiv.appendChild($like)
                                        likeDiv.appendChild(likeIcon)

                                        if (data.isLiked) {
                                                likeIcon.classList.add('liked')
                                                likeIcon.src = 'assets/icons/liked.svg'
                                        }

                                btn.appendChild(video);
                                article.appendChild(btn);

                                const infoMedia = document.createElement('div');
                                infoMedia.classList.add('expo_wrapper_card_info');
                                infoMedia.appendChild(pictureTitle);
                                infoMedia.appendChild(likeDiv);
                                article.appendChild(infoMedia);
                        
                                return (article);
                        }

                        const getLightboxDOM = () => {
                                const mySlides = document.createElement( 'div' );
                                mySlides.classList.add('mySlides');
                                
                                const video = document.createElement( 'video' );
                                video.setAttribute("src", picture)
                                video.setAttribute("alt", title)
                                video.setAttribute("controls", true)
                                video.setAttribute("role", "video")
                                mySlides.appendChild(video);
                                const prev = document.createElement( 'a' );
                                prev.classList.add('prev');
                                prev.textContent = 'prev';
                                mySlides.appendChild(prev);
                                const next = document.createElement( 'a' );
                                next.classList.add('next');
                                next.textContent = 'next';
                                mySlides.appendChild(next);
                                const close = document.createElement( 'a' );
                                close.classList.add('close');
                                close.textContent = 'close';
                                mySlides.appendChild(close);
        
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