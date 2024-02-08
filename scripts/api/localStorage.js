export const saveToLocalStorage = async (data) => {
    window.localStorage.setItem("photographers", JSON.stringify(data.photographers));
    const photosByPhotographer = {} 
    let lastId = null;
    data.media.forEach((media) => {
    media.isliked = 0;
        if (!photosByPhotographer[media.photographerId]) {
            if (lastId) {
                window.localStorage.setItem(`media-${lastId}`, JSON.stringify(photosByPhotographer[lastId])); 
            }
            photosByPhotographer[media.photographerId] = [];
        }
        photosByPhotographer[media.photographerId].push(media);
        lastId = media.photographerId;
        
    });
    window.localStorage.setItem(`media-${lastId}`, JSON.stringify(photosByPhotographer[lastId])); 
}