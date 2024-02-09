import Media from "../models/Media.js";
import { expoCustomSelectTemplate, expoPhotographerTemplate, expoSorterTemplate } from "../templates/expo.js";
import Page from "./Page.js";
import { displayModal } from "../utils/contactForm.js";
import { closeLightbox, currentSlide, displayLightbox } from "../utils/lightbox.js";
import MediaFactory from "../factory/mediaFactory.js";
import { sortBy } from "../utils/sorter.js";




class PhotographerPage extends Page {

    constructor(id, photographers, App) {
        super(App)
        this.photographerId = id;
        this.photographers = photographers
        this.$expoWrapper = document.querySelector('.expo_wrapper')
        this.medias = []
        this.displaiedMedia = null
        this.sortBy = 'likes'
        this.totalLikes = 0
    }

    async getPhotographer() {
        // une methode plus rapide que filter pour trouver le photographe   
        this.photographer = this.photographers.find((photographer) => photographer.id == this.photographerId);
    }
    
    async getMedias() {
        this.medias = JSON.parse(window.localStorage.getItem(`media-${this.photographerId}`));
        // const localMedias = JSON.parse(window.localStorage.getItem(`media-${this.photographerId}`));
        // this.medias = localMedias
        //     .map(media => new Media(media))
    }

    async displayExpo (medias, photographer) {

        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.get('sortBy')) {
            this.sortBy = urlParams.get('sortBy').toString()
        }

        const $expoSorter = document.querySelector('.expo_sorter')
        $expoSorter.style.width = '200px'
        

        if ($expoSorter.textContent == '') {
            const sorterTag = document.createElement('p')
            sorterTag.textContent = 'Trier par'
            sorterTag.classList.add('expo_sorter_tag')
            $expoSorter.appendChild(sorterTag)
            $expoSorter.appendChild(expoSorterTemplate(this))
            const select = document.querySelector('#sorter')
            select.classList.add('expo_sorter_select')
            sortBy(this.medias, this.sortBy)
            
            select.addEventListener('change', (e) => {
                sortBy(this.medias, e.target.value)
                this.sortBy = e.target.value
                history.pushState({}, '', `?id=${this.photographerId}&sortBy=${this.sortBy}`)
                
                const $expoLightBox = document.querySelector('#myLightbox')
                const $customSelect = document.querySelector('.custom-select')
                $customSelect.remove()
                $expoLightBox.remove()
                this.$expoWrapper.textContent = ''

                this.displayExpo(this.medias, photographer)
                this.handleLightbox()
            })
        }
        
        $expoSorter.appendChild(expoCustomSelectTemplate(this))
        displayLightbox()
        const lightboxContent = document.querySelector('.lightbox-content')
        
        // for of plus rapide que forEach
        this.totalLikes = 0
        for (const media of medias) {
            
            const temp = new Media(media);
            this.totalLikes += temp.likes
            const mediaModel = new MediaFactory(temp, photographer);
            
            const lightboxDOM = mediaModel.getLightboxDOM();
            lightboxContent.appendChild(lightboxDOM);


            const expoCardDOM = mediaModel.getExpoCardDOM();
            this.$expoWrapper.appendChild(expoCardDOM);
        }
    }

    async displayPhotographerData (photographer) {
        const photographerModel = expoPhotographerTemplate(this, photographer);
        const expoPhotographerCardDOM = photographerModel.getExpoPhotographerCardDOM();
        const $expoPhotographerWrapper = document.querySelector('.photograph-header')
        const $btn = document.createElement('button')
        $btn.classList.add('contact_button')
        $btn.classList.add('photographer_contact')
        $btn.classList.add('btn')
        $btn.textContent = 'Contactez-moi'
        const $photographerPicture = document.createElement('img')
        $photographerPicture.src = `assets/photographers/${photographer.portrait}`
        $photographerPicture.alt = `Portrait de ${photographer.name}`
        $photographerPicture.classList.add('photographer_picture')
        
        $expoPhotographerWrapper.appendChild(expoPhotographerCardDOM);
        $expoPhotographerWrapper.appendChild($btn)
        $expoPhotographerWrapper.appendChild($photographerPicture)

    }

    async removeNavNosPhotographe() {
        document.querySelector('header h1') && document.querySelector('header h1').remove()
    }

    async handleLightbox () {
        const lightbox = document.querySelector('#myLightbox')
        const urlParams = new URLSearchParams(window.location.search);
        const media = urlParams.get('media')
        this.displaiedMedia = media
        
        if (media) {
            currentSlide(media)
            lightbox.style.display = 'block'
            lightbox.setAttribute("aria-hidden", "false");
        }
        
        const $mediaCards = document.querySelectorAll('.expo_wrapper article')
        
        let i = 0
        const $mySlides = document.querySelectorAll('.mySlides')
        for (const $mediaCard of $mediaCards) {
            ++i
            const prevButton = $mySlides[i-1].querySelector('.prev')
            const nextButton = $mySlides[i-1].querySelector('.next')
            const closeBtn = $mySlides[i-1].querySelector('.close')
            const likeNumber = $mediaCard.querySelector('.like')
            const likeTotal = document.querySelector('.likeTotal')
            const likeIcon = $mediaCard.querySelector('.expo_wrapper_card_info_like_icon')

            likeIcon.addEventListener('click', ((index) => {
                return () => {
                    if (!likeIcon.classList.contains('liked')) {
                        likeNumber.textContent = parseInt(likeNumber.textContent) + 1
                        likeIcon.classList.add('liked')
                        likeIcon.src = 'assets/icons/liked.svg'
                        likeTotal.textContent = parseInt(likeTotal.textContent) + 1
                        this.totalLikes += 1
                        this.medias[index-1].likes += 1
                        this.medias[index-1].isLiked = 1
                        window.localStorage.setItem(`media-${this.photographerId}`, JSON.stringify(this.medias));
                    } else {
                        likeNumber.textContent = parseInt(likeNumber.textContent) - 1
                        likeIcon.classList.remove('liked')
                        likeIcon.src = 'assets/icons/like.svg'
                        likeTotal.textContent = parseInt(likeTotal.textContent) - 1
                        this.totalLikes -= 1
                        this.medias[index-1].likes -= 1
                        this.medias[index-1].isLiked = 0
                        window.localStorage.setItem(`media-${this.photographerId}`, JSON.stringify(this.medias));
                    }
                    
                }
            })(i))

            closeBtn.addEventListener('click', (() => {
                return () => {
                    history.pushState({}, '', `?id=${this.photographerId}&sortBy=${this.sortBy}`)
                    this.displaiedMedia = null
                    closeLightbox()
                }
            })(i))

            prevButton.addEventListener('click', ((index) => {
                return () => {
                    let slideIndex = parseInt(index) - 1;
                    currentSlide(slideIndex)
                    if (slideIndex < 1) {slideIndex = $mediaCards.length}
                    history.pushState({}, '', `?id=${this.photographerId}&media=${slideIndex}&sortBy=${this.sortBy}`)
                    this.displaiedMedia = slideIndex
                }
            })(i))
            
            nextButton.addEventListener('click', ((index) => {
                return () => {
                    let slideIndex = parseInt(index) + 1;
                    currentSlide(slideIndex)
                    if (slideIndex > $mediaCards.length) {slideIndex = 1}
                    history.pushState({}, '', `?id=${this.photographerId}&media=${slideIndex}&sortBy=${this.sortBy}`)
                    this.displaiedMedia = slideIndex
                }
            })(i))

            const $mediaButton = $mediaCard.querySelector('button')
            $mediaButton.addEventListener('click', ((index) => {
                return () => {
                    currentSlide(index)
                    lightbox.style.display = 'block'
                    lightbox.setAttribute("aria-hidden", "false");
                    history.pushState({}, '', `?id=${this.photographerId}&media=${index}&sortBy=${this.sortBy}`)
                    this.displaiedMedia = index
                }
            })(i)) // closure pour regler probleme de scope/portée
        }
    }

    async handleModalForm () {
        const $contactBtn = document.querySelector('.contact_button')
        $contactBtn.addEventListener('click', () => {
            const modal = displayModal()
            const $closeBtn = document.querySelector('.modal img')
            $closeBtn.addEventListener('click', () => {
                modal.style.display = 'none'
                modal.setAttribute("aria-hidden", "true");
            })
        })
    }

    async main() {
        await this.getPhotographer()
        await this.getMedias()
        this.displayExpo(this.medias, this.photographer)
        this.removeNavNosPhotographe()
        this.displayPhotographerData(this.photographer)
        this.handleModalForm()
        this.handleLightbox()
    }
}

export default PhotographerPage;

